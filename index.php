<?php
// Connessione al database
$host = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "db_login";

// Connessione
$conn = new mysqli($host, $username, $password, $dbname);

// Controlla connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Crea la tabella se non esiste
$sql = "CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(255),
    data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($sql);

// Inizializza messaggio
$message = "";

// Se il form è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prendi i dati dal form
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Verifica se l'utente esiste già
    $check = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        $message = "⚠️ L'email è già registrata.";
    } else {
        // Hash della password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Inserisci nel DB
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed_password);

        if ($stmt->execute()) {
            $message = "✅ Registrazione completata con successo!";
        } else {
            $message = "❌ Errore nella registrazione: " . $stmt->error;
        }

        $stmt->close();
    }

    $check->close();
}

$conn->close();
?>

<!-- PARTE HTML -->
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrazione</title>
</head>
<body>
    <h2>Registrazione Nuovo Utente</h2>
    <form method="POST" action="index.php">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required>
        <br><br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
        <br><br>
        <button type="submit">Registrati</button>
    </form>

    <?php if (!empty($message)) echo "<p><strong>$message</strong></p>"; ?>
</body>
</html>