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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// DOM elements
const registerButton = document.getElementById('registerButton');
const loginBiometricButton = document.getElementById('loginBiometricButton');

// Check if the user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        registerButton.style.display = 'block';
    } else {
        registerButton.style.display = 'none';
    }
});

// Register biometric
registerButton.addEventListener('click', async () => {
    const user = auth.currentUser;

    if (!user) {
        alert("Please log in first.");
        return;
    }

    const response = await fetch('/generate-registration-options.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid }),
    });

    const options = await response.json();
    const credential = await navigator.credentials.create({
        publicKey: options,
    });

    await fetch('/register-credential.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential, uid: user.uid }),
    });

    alert("Biometric registration successful!");
});

// Login with biometrics
loginBiometricButton.addEventListener('click', async () => {
    const user = auth.currentUser;

    if (!user) {
        alert("Please log in first.");
        return;
    }

    const response = await fetch('/generate-authentication-options.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: user.uid }),
    });

    const options = await response.json();
    const credential = await navigator.credentials.get({
        publicKey: options,
    });

    const verificationResponse = await fetch('/authenticate-credential.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential, uid: user.uid }),
    });

    const result = await verificationResponse.json();

    if (result.success) {
        alert("Login successful!");
        window.location.href = "https://your-secure-website.com";
    } else {
        alert("Biometric authentication failed.");
    }
});