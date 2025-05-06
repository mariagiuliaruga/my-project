<?php
// forgot_password.php
include 'connessione.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim($_POST['email']);

    if (!empty($email)) {
        // Verifica se l'email esiste nel database
        $stmt = $conn->prepare("SELECT * FROM utenti WHERE email = :email");
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $utente = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($utente) {
            // Genera il token e la data di scadenza
            $token = bin2hex(random_bytes(16));
            $expires_at = date("Y-m-d H:i:s", strtotime('+1 hour'));

            // Inserisce il token nella tabella di reset della password
            $stmt = $conn->prepare("INSERT INTO password_reset (email, token, expires_at) VALUES (:email, :token, :expires_at)");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':token', $token, PDO::PARAM_STR);
            $stmt->bindParam(':expires_at', $expires_at, PDO::PARAM_STR);
            $stmt->execute();

            // Link di reset (modifica con il tuo dominio reale)
            $resetLink = "http://localhost/my-project/reset_password.php?token=$token";

            // Funzione per inviare l'email
            sendPasswordResetEmail($email, $resetLink);
            echo 'Email inviata con successo! Controlla la casella di spam';
        } else {
            echo "Email non trovata nel nostro sistema.";
        }
    } else {
        echo "Inserisci un'email valida.";
    }
} else {
    echo "Richiesta non valida.";
}

// Funzione per inviare l'email
function sendPasswordResetEmail($toEmail, $resetLink) {
    $mail = new PHPMailer(true);
    try {
        // Configurazione SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // SMTP di Gmail
        $mail->SMTPAuth = true;
        $mail->Username = 'mystylessence@gmail.com'; // La tua email
        $mail->Password = 'qafa wgxz kuix cynk'; // La tua password per app
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        // Mittente e destinatario
        $mail->setFrom('tuoemail@gmail.com', 'MyStileEssence');
        $mail->addAddress($toEmail);  // L'email dell'utente che ha richiesto il reset

        // Contenuto dell'email
        $mail->isHTML(true);
        $mail->Subject = 'Reset della password';
        $mail->Body    = "Clicca questo link per reimpostare la tua password: <a href='$resetLink'>$resetLink</a>";

        $mail->send();
    } catch (Exception $e) {
        echo "Errore nell'invio dell'email: {$mail->ErrorInfo}";
    }
}
?>
