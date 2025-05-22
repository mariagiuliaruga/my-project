<?php
session_start();

include __DIR__ . '/connessione.php';  // Include la connessione mysqli

$response = ['success' => false, 'message' => 'Credenziali errate'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email'], $_POST['password'])) {
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);

        if (!empty($email) && !empty($password)) {
            $stmt = $conn->prepare("SELECT * FROM utenti WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();

                // Controlla la password
                if (password_verify($password, $user['password'])) {
                    $_SESSION['email'] = $user['email']; // Salva in sessione
                    $response['success'] = true;
                    $response['message'] = 'Login riuscito';
                }
            }
        }
    }
}

echo json_encode($response);
$conn->close();
?>