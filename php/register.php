<?php
include __DIR__ . '/connessione.php';  // Connessione con PDO

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/src/Exception.php';
require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';

if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo json_encode(["success" => false, "message" => "PHPMailer non caricato"]);
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);

        if (!empty($email) && !empty($password)) {
            // Verifica se l'email è già registrata
            $sql_check_email = "SELECT * FROM utenti WHERE email = ?";
            $stmt_check = $conn->prepare($sql_check_email);
            $stmt_check->bind_param("s", $email);
            $stmt_check->execute();
            $result_check = $stmt_check->get_result();

            if ($result_check->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Email già registrata"]);
                exit;
            }

            // Cripta password e registra
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $data_registrazione = date("Y-m-d H:i:s");

            // Inserisci l'utente
            $sql_insert = "INSERT INTO utenti (email, password, data_registrazione) VALUES (?, ?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bind_param("sss", $email, $hashedPassword, $data_registrazione);

            if ($stmt_insert->execute()) {
                echo json_encode(["success" => true, "message" => "Registrazione riuscita"]);

                // Backup
                $sqlString = "INSERT INTO utenti (email, password, data_registrazione) VALUES ('$email', '$hashedPassword', '$data_registrazione');\n";
                file_put_contents("backup_utenti.sql", $sqlString, FILE_APPEND);
            } else {
                echo json_encode(["success" => false, "message" => "Errore nell'inserimento"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Email o password mancanti"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Parametri non validi"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Richiesta non valida"]);
}
?>
