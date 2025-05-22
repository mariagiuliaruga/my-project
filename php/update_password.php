<?php
header('Content-Type: application/json'); // ✅ DICHIARA IL TIPO DI RISPOSTA
require_once 'connessione.php'; // che istanzia $pdo

$email = trim($_POST['email'] ?? '');
$newPassword = $_POST['newPassword'] ?? '';

if (empty($email) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Email o pwd mancanti']);
    exit;
}

$hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

try {
    $stmt = $conn->prepare("UPDATE utenti SET password = :password WHERE email = :email");
    $stmt->execute(['password' => $hashedPassword, 'email' => $email]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nessun utente trovato con questa email']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Errore server: ' . $e->getMessage()]);
}
?>
