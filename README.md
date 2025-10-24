# ☁️ Cloud-Based File Storage and Retrieval System using Google Cloud Storage

### 📘 Overview
This project is a **multi-user cloud-based file storage web application** that allows users to **log in with Google**, **upload files**, and **manage their own storage securely**.  
It integrates **Google Cloud Storage**, **Firebase Authentication**, and **MongoDB Atlas** to provide a real-world demonstration of **Distributed Systems and Cloud Computing**.

---

## 🚀 Features
- 🔐 **Google Login (Firebase Authentication)**  
  Secure user authentication via Google OAuth.

- ☁️ **Cloud Storage Integration (Google Cloud Storage)**  
  Files are uploaded and stored securely in the cloud with unique signed URLs.

- 🧠 **Database (MongoDB Atlas)**  
  Stores file metadata such as name, URL, user email, and timestamp.

- 👥 **Multi-User Access Control**  
  Each user can only view and manage their own files.

- 🧾 **Dynamic Dashboard**  
  Displays uploaded files and allows viewing or deleting them.

- 🆓 **Completely Cloud-Based and Free Hosted Solution**

---

## 🧩 System Architecture
```

User → Firebase Auth → Node.js Server → Google Cloud Storage + MongoDB Atlas

````
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Authentication:** Firebase Authentication  
- **Database:** MongoDB Atlas (Cloud)  
- **Storage:** Google Cloud Storage  
- **Hosting:** Render (Free Cloud Hosting)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/cloud-storage-project.git
cd cloud-storage-project
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_atlas_connection_string
BUCKET_NAME=your_google_bucket_name
PORT=3000
```

### 4️⃣ Add Google Cloud Credentials

Create a file named `service-account.json` in the project root and paste your **Google Cloud Service Account Key**.

### 5️⃣ Run the Project

```bash
node index.js
```

Now open your browser and go to:

```
http://localhost:3000/login.html
```

## 🛠️ Technologies Used

| Category       | Technology              |
| -------------- | ----------------------- |
| Frontend       | HTML, CSS, JavaScript   |
| Backend        | Node.js, Express.js     |
| Cloud Storage  | Google Cloud Storage    |
| Authentication | Firebase Authentication |
| Database       | MongoDB Atlas           |
| File Upload    | Multer                  |
| Hosting        | Render                  |

---

## 🧱 Project Modules

| Module           | Description                                     |
| ---------------- | ----------------------------------------------- |
| Login Module     | Handles secure Google login using Firebase Auth |
| Upload Module    | Uploads files to Google Cloud Storage           |
| Storage Module   | Generates and manages secure signed URLs        |
| Metadata Module  | Stores and retrieves file data in MongoDB       |
| Delete Module    | Allows users to delete uploaded files           |
| Dashboard Module | Displays user-specific file list dynamically    |

---

## 🧠 Learning Outcomes

* Gained hands-on experience with **Cloud Computing** platforms
* Implemented **secure user authentication** using Firebase
* Learned **cloud database and storage integration**
* Understood **scalable distributed system design principles**

---

## 📸 Screenshots
<img width="1243" height="463" alt="Screenshot 2025-10-24 144414" src="https://github.com/user-attachments/assets/c884d53f-f189-428c-bf95-0bfa75e047ce" />

## 👨‍💻 Contributors

* **Aditya**
* **Sakshi**
* **Sharayu**

## 🏁 Conclusion

This project successfully demonstrates how multiple cloud computing tools can be integrated to build an efficient, dynamic, and secure file management system.
It aligns with the core principles of **Distributed Systems and Cloud Computing**, showcasing scalability, accessibility, and real-time user interaction.

---

## 🌐 Live Demo

> 🔗 [Hosted on Render](https://your-app-name.onrender.com) *(Replace this with your actual live URL)*



