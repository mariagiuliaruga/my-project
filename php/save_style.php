<?php
session_start();

$stile = $_POST['stile'];
$email = $_SESSION['email'];

$host = 'sql7.freesqldatabase.com';
$dbname = 'sql7777430';
$user = 'sql7777430';
$pass = 'CacMXZdVbr';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE utenti SET stile = :stile WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':stile' => $stile,
        ':email' => $email
    ]);

    echo "Stile aggiornato correttamente";

} catch (PDOException $e) {
    echo "Errore: " . $e->getMessage();
}
?>
