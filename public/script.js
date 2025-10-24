// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2B1obzKt2TTQHRlD5nnkEWrDj08zVm5I",
  authDomain: "dscc-cloud-project-6dacf.firebaseapp.com",
  projectId: "dscc-cloud-project-6dacf",
  storageBucket: "dscc-cloud-project-6dacf.appspot.com",
  messagingSenderId: "866402880511",
  appId: "1:866402880511:web:3077fd5d291792ed0635ca",
  measurementId: "G-17DW1TWG6N"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Handle Login Button
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  console.log("Login button clicked");
  signInWithPopup(auth, provider)
    .then(result => {
      console.log("Login successful:", result.user.email);
      // Save user data in browser
      localStorage.setItem("user", JSON.stringify(result.user));
      // Redirect to main dashboard
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Login Error:", error.code, error.message);
      alert("Login failed. Please try again.");
    });
});

// ✅ Auto Redirect if Already Logged In
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User already logged in:", user.email);
    window.location.href = "index.html";
  } else {
    console.log("No active session, please log in.");
  }
});
