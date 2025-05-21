<?php
$host = 'sql7.freesqldatabase.com';
$user = 'sql7777430';
$pass = 'CacMXZdVbr';
$dbname = 'sql7777430';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>
