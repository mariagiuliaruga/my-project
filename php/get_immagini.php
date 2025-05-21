<?php
session_start();
header('Content-Type: application/json');

// Controlla login
if (!isset($_SESSION['email'])) {
    echo json_encode(['errore' => true, 'messaggio' => 'Utente non loggato']);
    exit;
}

$email = $_SESSION['email'];

// Connessione DB (usa i tuoi dati)
$conn = new mysqli("sql7.freesqldatabase.com", "sql7777430", "CacMXZdVbr", "sql7777430");
if ($conn->connect_error) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore connessione DB']);
    exit;
}

$stmt = $conn->prepare("SELECT percorso_file FROM immagini WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$immagini = [];
while ($row = $result->fetch_assoc()) {
    $immagini[] = 'php/' . $row['percorso_file'];

}

$stmt->close();
$conn->close();

echo json_encode(['errore' => false, 'immagini' => $immagini]);
?>
