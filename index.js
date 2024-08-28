import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLRgwJCXDz9-NtntVCJDKB5tEPO5WwzAk",
  authDomain: "auth-c20e3.firebaseapp.com",
  projectId: "auth-c20e3",
  storageBucket: "auth-c20e3.appspot.com",
  messagingSenderId: "37692570985",
  appId: "1:37692570985:web:1f6369f1f3456f6acb91f8",
  measurementId: "G-XKW1J4TP3Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

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