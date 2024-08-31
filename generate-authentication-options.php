<?php
session_start();
require 'vendor/autoload.php';

use lbuchs\WebAuthn\WebAuthn;

$webAuthn = new WebAuthn('Your Website', 'https://your-website.com');

// Fetch the user's UID from the POST request
$data = json_decode(file_get_contents('php://input'), true);
$uid = $data['uid'];

// Fetch the user's public key from the Firebase database
$db = new \Firebase\FirebaseLib('https://your-project.firebaseio.com/', 'YOUR_DATABASE_SECRET');
$publicKey = $db->get("/users/$uid/publicKey");

// Generate the WebAuthn authentication options
$options = $webAuthn->getGetArgs($publicKey);

// Store the challenge in the session
$_SESSION['challenge'] = $webAuthn->getChallenge();

// Return the options as a JSON response