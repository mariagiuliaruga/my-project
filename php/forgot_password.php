<?php
// forgot_password.php
session_start();
require 'connessione.php'; // Deve restituire un oggetto $conn di tipo PDO

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php/PHPMailer/src/Exception.php';
require 'php/PHPMailer/src/PHPMailer.php';
require 'php/PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email']);

    if (!empty($email)) {
        try {
            // Verifica se l'email esiste nel database
            $stmt = $conn->prepare("SELECT * FROM utenti WHERE email = :email");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            $utente = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($utente) {
                // Genera token e scadenza
                $token = bin2hex(random_bytes(16));
                $expires_at = date("Y-m-d H:i:s", strtotime('+1 hour'));

                // Inserisce il token
                $stmt = $conn->prepare("INSERT INTO password_reset (email, token, expires_at) VALUES (:email, :token, :expires_at)");
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':token', $token);
                $stmt->bindParam(':expires_at', $expires_at);
                $stmt->execute();

                // Link di reset
                $resetLink = "http://localhost:3000/Documents/GitHub//my-project/php/reset_password.php?token=$token";
                // $resetLink = "http://localhost/my-project/php/reset_password.php?token=$token"; questo funziona ma non a mari

                // Invia l'email
                sendPasswordResetEmail($email, $resetLink);
                echo 'Email inviata con successo! Controlla anche la casella di spam.';
            } else {
                echo "Email non trovata nel nostro sistema.";
            }
        } catch (PDOException $e) {
            echo "Errore: " . $e->getMessage();
        }
    } else {
        echo "Inserisci un'email valida.";
    }
} else {
    echo "Richiesta non valida.";
}

// Funzione per l'invio dell'email con PHPMailer
function sendPasswordResetEmail($toEmail, $resetLink) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mystylessence@gmail.com';
        $mail->Password = 'qafa wgxz kuix cynk'; // Password per app Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ]
        ];

        $mail->setFrom('mystylessence@gmail.com', 'MyStileEssence');
        $mail->addAddress($toEmail);

        $mail->isHTML(true);
        $mail->Subject = 'Reset della password';
        $mail->Body = "Clicca questo link per reimpostare la tua password: <a href='$resetLink'>$resetLink</a>";

        $mail->send();
    } catch (Exception $e) {
        echo "Errore nell'invio dell'email: {$mail->ErrorInfo}";
    }
}
?>