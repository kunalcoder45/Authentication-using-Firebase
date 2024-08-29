// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

// Your Firebase configuration (replace this with your actual configuration)
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

// Setup reCAPTCHA
let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow sendVerificationCode
    sendVerificationCode();
  }
}, auth);

// Function to send verification code
function sendVerificationCode() {
  const phoneNumber = document.getElementById('phoneNumber').value;

  // Request to send verification code to the user's phone
  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code
      window.confirmationResult = confirmationResult;
      alert('Verification code sent to ' + phoneNumber);
    }).catch((error) => {
      // Error; SMS not sent
      console.error('Error during sending SMS:', error);
      alert('Error during sending SMS: ' + error.message);
    });
}

// Function to verify the code entered by the user
function verifyCode() {
  const code = document.getElementById('verificationCode').value;

  window.confirmationResult.confirm(code).then((result) => {
    // User signed in successfully
    const user = result.user;
    alert('Phone number verified successfully!');
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    console.error('Error during code verification:', error);
    alert('Error during code verification: ' + error.message);
  });
}

// Bind functions to the global window object (if you need to use inline event handlers in HTML)
window.sendVerificationCode = sendVerificationCode;
window.verifyCode = verifyCode;

// Or use this instead if you prefer event listeners in your JS
document.getElementById('sendCodeBtn').addEventListener('click', sendVerificationCode);
document.getElementById('verifyCodeBtn').addEventListener('click', verifyCode);  
