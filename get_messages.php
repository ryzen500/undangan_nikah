<?php
// API endpoint URL
$url = 'https://reservasirabi-6jcbwf4zj-ryzens-projects-a70d0bd2.vercel.app/api/reservation/messages';

// Initialize curl session
$ch = curl_init();

// Set curl options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Set headers
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Access-Control-Allow-Origin: *',  // Replace * with specific domain if needed
    'Cache-Control: public, max-age=31556952, immutable',
]);

// Execute curl session
$response = curl_exec($ch);

// Check for curl errors
if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
    exit;
}

// Close curl session
curl_close($ch);

// Output the response
header('Content-Type: application/json');
echo $response;
?>
