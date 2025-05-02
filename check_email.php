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

//Prepara una risposta JSON, che verrà restituito al frontend. Di default è false.
$response = array('success' => false);

// Verifica se i dati sono inviati tramite POST
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = trim($_POST['email']); // Rimuove gli spazi vuoti all'inizio e alla fine
    $password = trim($_POST['password']);

    if (!empty($email) && !empty($password)) {
        // Verifica se l'email esiste nel database
        $sql = "SELECT * FROM utenti WHERE email = ?";
        $stmt = $conn->prepare($sql); // Prepara la query per l'esecuzione, per sicurezza
        $stmt->bind_param("s", $email); // Collega il valore vero al segnaposto ?
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // L'email è trovata, verifica la password
            $user = $result->fetch_assoc(); //prende la prossima riga del risultato e la restituisce come array associativo
            if (password_verify($password, $user['password'])) {
                // Login riuscito
                $response['success'] = true;
            }
        }
    }
}

echo json_encode($response); // restituisce al frontend {"success":true}

// Chiudi la connessione al database
$conn->close();
