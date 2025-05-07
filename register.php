<?php
include __DIR__ . '/connessione.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Imposta il report degli errori
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Imposta intestazione per rispondere in JSON
header('Content-Type: application/json');

// Connessione al database
$servername = "sql7.freesqldatabase.com";
$username = "sql7777430"; // Nome utente DB
$password = "CacMXZdVbr";     // Password DB
$dbname = "sql7777430"; // Nome del database

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connessione al database fallita."]);
    exit;
}

// Gestisci la richiesta POST
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
                // Restituisce risposta JSON per email già registrata
                echo json_encode(["success" => false, "message" => "Email già registrata"]);
                $stmt_check->close();
                $conn->close();
                exit;
            }

            // Cripta la password
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $data_registrazione = date("Y-m-d H:i:s");

            // Inserisci l'utente
            $sql_insert = "INSERT INTO utenti (email, password, data_registrazione) VALUES (?, ?, ?)";
            $stmt_insert = $conn->prepare($sql_insert);
            $stmt_insert->bind_param("sss", $email, $hashedPassword, $data_registrazione);

            if ($stmt_insert->execute()) {
                // Registrazione riuscita
                echo json_encode(["success" => true, "message" => "Registrazione riuscita"]);
                // Salva anche in un file SQL appendibile, in modo da pote avere gli stessi dati da dispositivi diversi connessi allo stesso db
                $sqlString = "INSERT INTO utenti (email, password, data_registrazione) VALUES ('$email', '$hashedPassword', '$data_registrazione');\n";
                file_put_contents("backup_utenti.sql", $sqlString, FILE_APPEND);
            } else {
                echo json_encode(["success" => false, "message" => ""]);
            }

            $stmt_insert->close();
        } else {
            echo json_encode(["success" => false, "message" => "Email o password mancanti"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Parametri non validi"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Richiesta non valida"]);
}

$conn->close();
?>
