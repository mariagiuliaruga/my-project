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

    $stmt = $conn->prepare("SELECT stile FROM utenti WHERE email = :email");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row && $row['stile']) {
        echo json_encode(['errore' => false, 'stile' => $row['stile']]);
    } else {
        echo json_encode(['errore' => true, 'messaggio' => 'Nessuno stile trovato']);
    }

} catch (PDOException $e) {
    echo json_encode(['errore' => true, 'messaggio' => 'Errore connessione DB: ' . $e->getMessage()]);
}
?>
