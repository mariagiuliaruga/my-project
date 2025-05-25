<?php
// forgot_password.php
session_start();
require 'connessione.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

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

                $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";

                // Ottieni il nome host (es: localhost o dominio)
                $host = $_SERVER['HTTP_HOST'];

                // Ottieni il percorso della cartella corrente e risali
                $path = dirname($_SERVER['PHP_SELF']); // es: /my-project/php
                $resetLink = "$scheme://$host$path/reset_password.php?token=$token";

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
