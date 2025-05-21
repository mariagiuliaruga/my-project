<?php
$servername = "sql7.freesqldatabase.com";
$username = "sql7777430";
$password = "CacMXZdVbr";
$dbname = "sql7777430";

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connessione fallita: " . $conn->connect_error]));
}
?>
