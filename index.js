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



/* Google Authentication*/


const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");

googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            // Redirect after successful login
            window.location.href = "/logged.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error during sign-in:", errorCode, errorMessage);
            // Optionally, display the error to the user
            alert(`Sign-in failed: ${errorMessage}`);
        });
});

// GitHub provider setup
const provider = new GithubAuthProvider();

// Button to trigger GitHub login
const githubLoginBtn = document.getElementById("github-login-btn");

githubLoginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        console.log("User Info:", user);
        // Redirect to another page after login
        window.location.href = "/logged.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign-in:", errorCode, errorMessage);
    });
});