<?php
session_start();

require 'connessione.php';

header('Content-Type: application/json');

// Controlla login
if (!isset($_SESSION['email'])) {
    echo json_encode(['errore' => true, 'messaggio' => 'Utente non loggato']);
    exit;
}

$email = $_SESSION['email'];

try {
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT percorso_file FROM immagini WHERE email = :email");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $immagini = [];
    // stmt->fetch restituisce un singolo risultato come array associativo $row,
    // dove la chiave è il nome della colonna e il valore è il contenuto della cella
    //$row = ["percorso_file" => "immagini_salvate/outfit_123.png"];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) { 
        $immagini[] = 'php/' . $row['percorso_file'];
    }

    echo json_encode(['errore' => false, 'immagini' => $immagini]);

} catch (PDOException $e) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore connessione DB: ' . $e->getMessage()]);
}
?>