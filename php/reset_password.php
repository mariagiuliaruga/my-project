<?php
require __DIR__ . '/connessione.php'; // Corretto percorso
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    try {
        // Cerca il token valido non scaduto
        $stmt = $conn->prepare("SELECT * FROM password_reset WHERE token = :token AND expires_at > NOW()");
        $stmt->bindParam(':token', $token, PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $email = $row['email'];

            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
                $new_pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

                // Aggiorna la password
                $stmt = $conn->prepare("UPDATE utenti SET password = :password, data_registrazione = NOW() WHERE email = :email");
                $stmt->bindParam(':password', $new_pass, PDO::PARAM_STR);
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->execute();

                // Elimina il token usato
                $stmt = $conn->prepare("DELETE FROM password_reset WHERE email = :email");
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->execute();

                echo "✅ Password aggiornata con successo!";
                exit;
            }
        } else {
            echo "❌ Token non valido o scaduto.";
            exit;
        }

    } catch (PDOException $e) {
        echo "Errore: " . $e->getMessage();
        exit;
    }

} else {
    echo "❌ Token mancante.";
    exit;
}
?>

<!-- Form per inserire la nuova password -->
<form method="POST">
    <input type="password" name="password" placeholder="Nuova password" required>
    <button type="submit">Salva nuova password</button>
</form>