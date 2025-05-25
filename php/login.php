<?php
session_start();

require 'connessione.php';

$response = ['success' => false, 'message' => 'Credenziali errate'];

try {
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verifica se è una richiesta POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['email'], $_POST['password'])) {
            $email = trim($_POST['email']);
            $password = trim($_POST['password']);

            if (!empty($email) && !empty($password)) {
                $stmt = $conn->prepare("SELECT * FROM utenti WHERE email = :email");
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);

                    // Verifica la password
                    if (password_verify($password, $user['password'])) {
                        $_SESSION['email'] = $user['email'];
                        $response['success'] = true;
                        $response['message'] = 'Login riuscito';
                    }
                }
            }
        }
    }
} catch (PDOException $e) {
    $response['message'] = 'Errore di connessione: ' . $e->getMessage();
}

// Risposta JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
