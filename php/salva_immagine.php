<?php
session_start(); //attiva la sessione PHP per accedere ai dati salvati, come l’email dell’utente che servirà per collegarsi al database

require 'connessione.php';

header('Content-Type: application/json');

// Verifica che l'utente sia loggato
if (!isset($_SESSION['email'])) {
    echo json_encode(['errore' => true, 'messaggio' => 'Utente non loggato']);
    exit;
}

$email = $_SESSION['email']; // se è loggato, salva l'email in $email 

// Legge i dati JSON dal frontend e li decodifica in array associativo $data = ['immagine' => 'base64data'];
// in modo che $data['immagine'] sia accessibile
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

// decodifica l'immagine base64
$base64 = $data['immagine'];
$base64 = str_replace('data:image/png;base64,', '', $base64);
$base64 = str_replace(' ', '+', $base64);
$immagineBinaria = base64_decode($base64);

// crea nome file unico
$nomeFile = uniqid('outfit_', true) . '.png';
$percorsoFile = $cartella . $nomeFile; // crea una stringa percorsoFile con dentro "immagini_salvate/outfit_xxx.png"

// salva l'immagine nel server
file_put_contents($percorsoFile, $immagineBinaria);

// Connessione PDO
try {
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Inserisco percorso immagine nel database
    $stmt = $conn->prepare("INSERT INTO immagini (email, percorso_file) VALUES (:email, :percorso)");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':percorso', $percorsoFile, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(['errore' => false, 'messaggio' => 'Immagine salvata con successo']);

} catch (PDOException $e) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore DB: ' . $e->getMessage()]);
}
?>