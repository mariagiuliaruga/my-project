<?php
include __DIR__ . '/connessione.php';

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $newPassword = $_POST['newPassword'] ?? '';

    if (empty($email) || empty($newPassword)) {
        echo json_encode(["success" => false, "message" => "Campi mancanti"]);
        exit;
    }

    // Hash della nuova password
    $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

    $sql = "UPDATE utenti SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $hashedPassword, $email);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Password aggiornata"]);
    } else {
        echo json_encode(["success" => false, "message" => "Errore nell'aggiornamento"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Richiesta non valida"]);
}
?>
