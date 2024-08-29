/*
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


*/


import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();
auth.languageCode = 'it';
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {}); 
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  }
});

recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId); 

const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;

const auth = getAuth();
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });


grecaptcha.reset(window.recaptchaWidgetId);

// Or, if you haven't stored the widget ID:
window.recaptchaVerifier.render().then(function(widgetId) {
  grecaptcha.reset(widgetId);
});

const code = getCodeFromUserInput();
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});

var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);

firebase.auth().signInWithCredential(credential);

// Turn off phone auth app verification.
firebase.auth().settings.appVerificationDisabledForTesting = true;

var phoneNumber = "+16505554567";
var testVerificationCode = "123456";

// This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
// This will resolve after rendering without app verification.
var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
// signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
// reCAPTCHA response.
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // confirmationResult can resolve with the fictional testVerificationCode above.
      return confirmationResult.confirm(testVerificationCode)
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });

