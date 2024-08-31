<?php
session_start();
require 'vendor/autoload.php';

use lbuchs\WebAuthn\WebAuthn;

$webAuthn = new WebAuthn('Your Website', 'https://your-website.com');

// Fetch the credential and UID from the POST request
$data = json_decode(file_get_contents('php://input'), true);
$credential = $data['credential'];
$uid = $data['uid'];

// Retrieve the challenge from the session
$challenge = $_SESSION['challenge'];

try {
    // Validate the credential
    $publicKey = $webAuthn->processCreate($credential, $challenge);

    // Store the public key in the Firebase database (using Firebase Admin SDK)
    $db = new \Firebase\FirebaseLib('https://your-project.firebaseio.com/', 'YOUR_DATABASE_SECRET');
    $db->set("/users/$uid/publicKey", $publicKey);

    // Respond with success
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok']);
} catch (Exception $e) {
    // Respond with error
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>