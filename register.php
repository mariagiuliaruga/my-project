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

// Controlla se il form è stato inviato
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se i campi email e password sono presenti
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        
        // Verifica che email e password non siano vuoti
        if (!empty($email) && !empty($password)) {

            // Controlla se l'email è già registrata nel database
            $sql_check_email = "SELECT * FROM utenti WHERE email = ?";
            $stmt_check = $conn->prepare($sql_check_email);
            $stmt_check->bind_param("s", $email);
            $stmt_check->execute();
            $result_check = $stmt_check->get_result();

            if ($result_check->num_rows > 0) {
                // L'email esiste già, mostra un messaggio di errore
                echo "L'email è già registrata!";
            } else {
                // Cripta la password
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

                // Imposta la data di registrazione
                $data_registrazione = date("Y-m-d H:i:s");

                // Prepara la query SQL per inserire i dati nel database
                $sql = "INSERT INTO utenti (email, password, data_registrazione) VALUES (?, ?, ?)";
                $stmt = $conn->prepare($sql);

                if ($stmt === false) {
                    // Errore nella preparazione della query
                    echo "Errore nella preparazione della query: " . $conn->error;
                    exit();
                }

                // Collega i parametri alla query
                $stmt->bind_param("sss", $email, $hashedPassword, $data_registrazione);

                // Esegui la query e verifica il risultato
                if ($stmt->execute()) {
                    // Registrazione riuscita, fai il redirect a index.html
                    header("Location: index.html");
                    exit();
                } else {
                    echo "Errore durante la registrazione: " . $stmt->error;
                }

                // Chiudi la dichiarazione
                $stmt->close();
            }

            // Chiudi la dichiarazione di controllo email
            $stmt_check->close();
        } else {
            echo "Email o password mancanti!";
        }
    } else {
        echo "Dati del form non inviati correttamente!";
    }
} else {
    echo "Metodo di richiesta non valido!";
}

// Chiudi la connessione al database
$conn->close();
?>
