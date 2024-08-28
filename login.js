import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

document.getElementById('login-btn').addEventListener('click', function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in:', user);
        alert('Log In Successful!');

        // Redirect to another page after successful login
        window.location.href = "/logged.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Log In Error:', errorCode, errorMessage);
        alert('Error during Log In: ' + errorMessage);
    });
});


