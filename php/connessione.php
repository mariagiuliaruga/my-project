<?php
$host = 'localhost';              // o 127.0.0.1
$user = 'root';                  // oppure il tuo utente DB
$password = '';                  // metti la tua password se ne hai una
$database = 'mystyleessence_db'; // il nome corretto del tuo DB

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
?>
