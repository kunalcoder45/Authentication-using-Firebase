import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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

// Initialize the Facebook provider
const provider = new FacebookAuthProvider();

// Get the Facebook login button element
const facebookLoginButton = document.getElementById("fb-login-btn");

// Add an event listener to the login button
facebookLoginButton.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log("User Info:", user);

      // Redirect the user after successful login
      window.location.href = "/logged.html";
    })
    .catch((error) => {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-in:", errorCode, errorMessage);
      alert(`Sign-in failed: ${errorMessage}`);
    });
});

/*

        const appId = '969823708165219';
        const appSecret = '0269cbd3248fe2c2290b7c4d';
        const clientToken = '2c73ffe52da7e3c6110636c29d3c6e76';

        window.fbAsyncInit = function() {
            FB.init({
                appId      : appId,
                cookie     : true,
                xfbml      : true,
                version    : 'v8.0'
            });

            FB.AppEvents.logPageView();

            document.getElementById('fb-login-btn').addEventListener('click', function() {
                FB.login(function(response) {
                    if (response.authResponse) {
                        console.log('Welcome! Fetching your information.... ');
                        FB.api('/me', { fields: 'name,email' }, function(response) {
                            console.log('Good to see you, ' + response.name + '.');
                        });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {scope: 'public_profile,email'});
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

*/
 