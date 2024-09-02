<?php
session_start();
require 'vendor/autoload.php';

use lbuchs\WebAuthn\WebAuthn;

$webAuthn = new WebAuthn('Your Website', 'https://user-authentation.netlify.app');

// Fetch the user's UID from the POST request
$data = json_decode(file_get_contents('php://input'), true);
$uid = $data['uid'];

// Generate the WebAuthn registration options
$options = $webAuthn->getCreateArgs($uid);

// Store the challenge in the session
$_SESSION['challenge'] = $webAuthn->getChallenge();

// Return the options as a JSON response
header('Content-Type: application/json');
echo json_encode($options);
?>