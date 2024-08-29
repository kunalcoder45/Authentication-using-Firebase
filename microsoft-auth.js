// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhr2QrGgAZ4CiX1E_NGuCTEjO5mdO8rR0",
  authDomain: "user-authentication-47380.firebaseapp.com",
  projectId: "user-authentication-47380",
  storageBucket: "user-authentication-47380.appspot.com",
  messagingSenderId: "483187118922",
  appId: "1:483187118922:web:671077478349e12edf67b3",
  measurementId: "G-7Y7Z6GGWZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create Microsoft OAuth provider
const provider = new OAuthProvider('microsoft.com');

// Function to handle Microsoft sign-in
function signInWithMicrosoft() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // User signed in successfully
            const user = result.user;
            alert('Signed in as ' + user.displayName);
            console.log('User Info:', user);
        })
        .catch((error) => {
            // Handle Errors here.
            console.error('Error during sign-in:', error);
            alert('Error: ' + error.message);
        });
}

// Attach event listener to the Microsoft sign-in button
document.getElementById('microsoftSignInBtn').addEventListener('click', signInWithMicrosoft);