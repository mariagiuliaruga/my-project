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

                echo "✅ Password aggiornata con successo! <br><br>";
                echo '<a href="/index.html" style="display: inline-block; padding: 10px 20px; background-color: rgb(255, 94, 159); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: Segoe UI, sans-serif;">Torna alla home</a>';
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

<form method="POST" style="max-width: 420px; margin: 100px auto; padding: 30px 25px; background: #fff; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); text-align: center; font-family: 'Segoe UI', sans-serif;">
  <h2 style="margin-bottom: 25px; color: #333; font-size: 20px;">Imposta una nuova password</h2>
  <input type="password" name="password" placeholder="Nuova password" required style="width: 100%; padding: 12px 14px; margin-bottom: 20px; border: 1px solid #ddd; border-radius: 10px; font-size: 15px; transition: border-color 0.3s;" onfocus="this.style.borderColor='rgb(255, 94, 159)'" onblur="this.style.borderColor='#ddd'">
  <button type="submit" style="width: 100%; padding: 12px; background-color: rgb(255, 94, 159); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: bold; cursor: pointer; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='rgb(235, 84, 149)'" onmouseout="this.style.backgroundColor='rgb(255, 94, 159)'">Salva nuova password</button>
</form>
