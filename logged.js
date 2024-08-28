import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhr2QrGgAZ4CiX1E_NGuCTEjO5mdO8rR0",
  authDomain: "user-authentication-47380.firebaseapp.com",
  projectId: "user-authentication-47380",
  storageBucket: "user-authentication-47380.appspot.com",
  messagingSenderId: "483187118922",
  appId: "1:483187118922:web:671077478349e12edf67b3",
  measurementId: "G-7Y7Z6GGWZ4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase (app)

function updateUserProfile(user) {
  const userName = user.displayName || "No name provided";
  const userEmail = user.email || "No email provided";
  const userProfilePicture = user.photoURL || "default-profile.png"; // Provide a default image if null

  document.getElementById("userName").textContent = userName;
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    updateUserProfile(user);
    const uid = user.uid;
    console.log("User ID:", uid);
    return uid;
  } else {
    alert("Please create an account & log in.");
    window.location.href = "/index.html";
  }
});