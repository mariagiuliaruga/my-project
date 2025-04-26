<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connessione al database
$servername = "localhost";
$username = "root"; // Nome utente DB
$password = ""; // Password DB
$dbname = "mystyleessence_db"; // Nome del tuo database

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Controlla la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

$response = array('success' => false);

// Verifica se i dati sono inviati tramite POST
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (!empty($email) && !empty($password)) {
        // Verifica se l'email esiste nel database
        $sql = "SELECT * FROM utenti WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // L'email è trovata, verifica la password
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Login riuscito
                $response['success'] = true;
            }
        }
    }
}

echo json_encode($response);

// Chiudi la connessione al database
$conn->close();
?>
