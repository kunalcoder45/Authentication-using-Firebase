import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
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