import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
auth.languageCode = 'en';
const database = getDatabase(app);

// Initialize the Facebook provider
const provider = new FacebookAuthProvider();

// Get the Facebook login button element
const facebookLoginButton = document.getElementById("fb-login-btn");

// Add an event listener to the login button
facebookLoginButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log("User Info:", user);

      // Redirect the user after successful login
      window.location.href = "/logged.html";
    })
    .catch((error) => {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-in:", errorCode, errorMessage);
      alert(`Sign-in failed: ${errorMessage}`);
    });
});
