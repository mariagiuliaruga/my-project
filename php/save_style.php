<?php
session_start();

$host = 'sql7.freesqldatabase.com';
$dbname = 'sql7777430';
$user = 'sql7777430';
$pass = 'CacMXZdVbr';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $email = $_SESSION['email'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Salvataggio stile
        $stile = $_POST['stile'] ?? '';

        $sql = "UPDATE utenti SET stile = :stile WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':stile' => $stile,
            ':email' => $email
        ]);

        echo "Stile aggiornato correttamente";
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Lettura stile
        $sql = "SELECT stile FROM utenti WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':email' => $email
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result && $result['stile']) {
            echo json_encode(['stile' => $result['stile']]);
        } else {
            echo json_encode(['stile' => null]);
        }
    } else {
        http_response_code(405);
        echo "Metodo non supportato.";
    }

} catch (PDOException $e) {
    echo "Errore: " . $e->getMessage();
}
?>
