<?php
$host = 'sql7.freesqldatabase.com';
$dbname = 'sql7777430'; // <-- Sostituisci con il nome del tuo database
$user = 'sql7777430';
$password = 'CacMXZdVbr'; // Se non hai impostato una password, lascialo vuoto

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connessione fallita: " . $e->getMessage());
}
?>
