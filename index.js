require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// ------------------- MongoDB Setup -------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB Error:", err));

const FileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  userEmail: String, // 👈 Added for multi-user tracking
  uploadedAt: { type: Date, default: Date.now }
});
const File = mongoose.model('File', FileSchema);

// ------------------- Google Cloud Setup -------------------
const storage = new Storage({
  keyFilename: 'service-account.json'
});
const bucket = storage.bucket(process.env.BUCKET_NAME);

const upload = multer({ storage: multer.memoryStorage() });

// ------------------- Get File List -------------------
app.get('/files', async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    console.log(`GET /files - Fetching files for user: ${userEmail}`);
    const files = await File.find({ userEmail }).sort({ uploadedAt: -1 });
    console.log(`Found ${files.length} files for ${userEmail}`);
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).send("Error fetching files");
  }
});

// ------------------- Upload File -------------------
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log("POST /upload called");
    if (!req.file) {
      console.log("No file received");
      return res.status(400).send("No file uploaded");
    }

    console.log(`Received file: ${req.file.originalname}`);
    console.log(`File size: ${req.file.size} bytes`);
    console.log(`File type: ${req.file.mimetype}`);
    console.log(`Uploaded by user: ${req.body.userEmail}`);

    // Upload to Google Cloud Storage
    const blob = bucket.file(`${req.body.userEmail}_${req.file.originalname}`); // Unique name per user
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype
    });

    blobStream.on('error', (err) => {
      console.error("Error during GCS upload:", err);
      res.status(500).send("Error uploading to Google Cloud Storage");
    });

    blobStream.on('finish', async () => {
      console.log("Upload completed to Google Cloud");

      // ✅ Generate a signed URL (temporary access)
      const [url] = await blob.getSignedUrl({
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000 // valid for 24 hours
      });

      console.log("Signed URL generated:", url);

      // Save file metadata to MongoDB
      await File.create({
        filename: blob.name,
        url,
        userEmail: req.body.userEmail
      });
      console.log("File metadata saved to MongoDB");

      res.redirect('/');
    });

    console.log("Starting upload stream...");
    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error("Upload Exception:", err);
    res.status(500).send("Error uploading file");
  }
});

// ------------------- Delete File -------------------
app.get('/delete/:filename', async (req, res) => {
  try {
    console.log(`DELETE /delete/${req.params.filename}`);
    await bucket.file(req.params.filename).delete();
    await File.deleteOne({ filename: req.params.filename });
    console.log("File deleted from GCS and MongoDB");
    res.redirect('/');
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).send("Error deleting file");
  }
});

// ------------------- Start Server -------------------
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log("Environment Variables:");
  console.log("   MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "Missing");
  console.log("   Bucket Name:", process.env.BUCKET_NAME || "Missing");
});
