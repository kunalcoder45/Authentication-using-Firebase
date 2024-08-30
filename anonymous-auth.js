import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// Button to trigger anonymous login
const anonymousLoginBtn = document.getElementById("anonymous-login-btn");

anonymousLoginBtn.addEventListener("click", () => {
    signInAnonymously(auth)
    .then((result) => {
        const user = result.user;
        console.log("User Info (Anonymous):", user);
        alert(`Signed in as guest with ID: ${user.uid}`);
        // Redirect or show authenticated content
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during anonymous sign-in:", errorCode, errorMessage);
    });
});