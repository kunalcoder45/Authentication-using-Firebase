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