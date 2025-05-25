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
<form method="POST" style="max-width: 300px; margin: 40px auto; padding: 20px; background: #f9f9f9; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
    <input type="password" name="password" placeholder="Nuova password" required
        style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px;">
    <button type="submit"
        style="width: 100%; padding: 10px; background-color: #5c67f2; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">
        Salva nuova password
    </button>
</form>