// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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