import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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


/* email and password authentication*/

document.getElementById('signUp-btn').addEventListener('click', function() {
    const username = document.getElementById('signUp-username').value;
    const email = document.getElementById('signUp-email').value;
    const password = document.getElementById('signUp-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed up:', user);
            alert('Sign Up Successful!');

            // Redirect to the login page after sign up
            window.location.href = "/logged.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign Up Error:', errorCode, errorMessage);
            alert('Error during Sign Up: ' + errorMessage);
        });
});

// Show/Hide Password Functionality
const passwordInput = document.getElementById("signUp-password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    // Toggle the eye icon
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});

// Email Validation
const emailInput = document.getElementById("signUp-email");
const emailError = document.getElementById("emailError");
const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", function(event) {
    if (!emailInput.value.includes("@")) {
        event.preventDefault();
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    }
});