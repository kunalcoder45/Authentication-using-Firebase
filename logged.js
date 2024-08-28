import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
// auth.languageCode = "en"
// const provider = new GoogleAuthProvider();

const user = auth.currentUser;

function updateUserProfile(user) {
  const userName = user.displayName || "No name provided";
  const userEmail = user.email || "No email provided";
  const userProfilePicture = user.photoURL || "default-profile.png"; // Provide a default image if null

  document.getElementById("userName").textContent = userName;
  document.getElementById("userEmail").textContent = userEmail;
  document.getElementById("userProfilePicture").src = userProfilePicture;
}

// This function checks the authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If user is signed in, update profile UI
    updateUserProfile(user);
    //console.log("User ID:", user.uid);
    const uid = user.uid;
    return uid;
    
  } else {
    // If no user is signed in, redirect to login page
    alert("Please create an account & log in.");
    window.location.href = "/index.html";
  }
});

// Ensure that the auth state is being checked after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      updateUserProfile(user);
    }
  });
});

// log out
const logOut = document.getElementById("logout-btn");

logOut.addEventListener("click", function() {
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
});



// Sign out function
document.getElementById('logout-btn').addEventListener('click', function() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('User signed out.');
        window.location.href = "login.html"; // Redirect to the login page after sign-out
    }).catch((error) => {
        // An error happened during sign-out.
        console.error('Sign out error:', error);
    });
});


