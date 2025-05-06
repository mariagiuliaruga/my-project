<?php
$host = 'localhost';
$dbname = 'mystyleessence_db'; // <-- Sostituisci con il nome del tuo database
$user = 'root';
$password = ''; // Se non hai impostato una password, lascialo vuoto

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connessione fallita: " . $e->getMessage());
}
?>
