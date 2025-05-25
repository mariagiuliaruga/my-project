<?php
//connessione al database
$host = 'sql7.freesqldatabase.com';
$dbname = 'sql7777430';
$user = 'sql7777430';
$pass = 'CacMXZdVbr';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connessione fallita: " . $e->getMessage());
}
?>
