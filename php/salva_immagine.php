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

// Crea la cartella se non esiste
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

// Salva l'immagine nel server
file_put_contents($percorsoFile, $immagineBinaria);

// Connessione PDO
try {
    $conn = new PDO("mysql:host=sql7.freesqldatabase.com;dbname=sql7777430", "sql7777430", "CacMXZdVbr");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Inserisci percorso immagine nel database
    $stmt = $conn->prepare("INSERT INTO immagini (email, percorso_file) VALUES (:email, :percorso)");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':percorso', $percorsoFile, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(['errore' => false, 'messaggio' => 'Immagine salvata con successo']);

} catch (PDOException $e) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore DB: ' . $e->getMessage()]);
}
?>
