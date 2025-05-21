<?php
session_start();
header('Content-Type: application/json');

// Verifica che l'utente sia loggato
if (!isset($_SESSION['email'])) {
    echo json_encode(['errore' => true, 'messaggio' => 'Utente non loggato']);
    exit;
}

$email = $_SESSION['email'];

// Leggi i dati JSON dal frontend
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['immagine'])) {
    echo json_encode(['errore' => true, 'messaggio' => 'Nessuna immagine ricevuta']);
    exit;
}

// crea la cartella immagini_salvate/ nella stessa directory del file PHP, se ancora non esiste
$cartella = 'immagini_salvate/';
if (!file_exists($cartella)) {
    mkdir($cartella, 0777, true);
}

// Decodifica l'immagine base64
$base64 = $data['immagine'];
$base64 = str_replace('data:image/png;base64,', '', $base64);
$base64 = str_replace(' ', '+', $base64);
$immagineBinaria = base64_decode($base64);

// Crea nome file unico
$nomeFile = uniqid('outfit_', true) . '.png';
$percorsoFile = $cartella . $nomeFile;

// Salva l'immagine sul server
file_put_contents($percorsoFile, $immagineBinaria);


// Salva nel database
$conn = new mysqli("sql7.freesqldatabase.com", "sql7777430", "CacMXZdVbr", "sql7777430");

if ($conn->connect_error) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore connessione DB']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO immagini (email, percorso_file) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $percorsoFile);
$stmt->execute();
$stmt->close();
$conn->close();

echo json_encode(['errore' => false, 'messaggio' => 'Immagine salvata con successo']);
?>
