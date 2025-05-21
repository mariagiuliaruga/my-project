<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/src/Exception.php';
require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';

$host = 'sql7.freesqldatabase.com';
$dbname = 'sql7777430';
$user = 'sql7777430';
$password = 'CacMXZdVbr';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);

    if (!$email) {
        echo "Email non valida.";
        exit;
    }

    $stmt = $conn->prepare("INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        // Email da inviare (usa immagini pubbliche direttamente accessibili)
        $body1 = '
        <div style="font-family: Arial, sans-serif; color: #333;">     -
            <h2>Grazie per esserti iscritta!</h2>

            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="text-align: center;">✨ Il primo stile è arrivato!</h2>

            <img src="https://drive.google.com/uc?export=view&id=1_FK-s5GhnEFQyxt08cddk5P5xs4TmRM7" alt="Stile 1" style="width: 100%; max-width: 400px; display: block; margin: 20px auto; border-radius: 8px;">

            <p style="text-align: center; font-size: 16px;">
                <strong>Natural Elegance</strong> – Per chi ama uno sguardo naturale ma definito.  
                Semplice, elegante, e perfetto per ogni occasione 🌿
            </p>

            <p style="text-align: center; font-size: 14px; margin-top: 30px;">
                👉 Torna domani per scoprire il <strong>secondo stile</strong> esclusivo!
            </p>
        ';

        $body2 = '
            </div>
            <h2 style="text-align: center;">🌸 Il secondo stile è qui!</h2>       

            <img src="https://drive.google.com/uc?export=view&id=1JMbtorW_vrW7oi41zCALwKhPY_6M4GMV" alt="Stile 2" style="...">

            <p style="text-align: center;">
            <strong>Soft Glam</strong> – Romantico, leggero e luminoso.  
            Ideale per chi vuole brillare con delicatezza ✨
            </p>

            <p style="text-align: center;">👉 Non perderti il terzo stile domani!</p>
        ';

        $body = $body1 . $body2;

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'mystylessence@gmail.com'; // tua email Gmail
            $mail->Password = 'nudc giyw srlx davu';    // password per app Google
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );

            $mail->setFrom('mystylessence@gmail.com', 'Nome Mittente');
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Iscrizione Newsletter Riuscita';
            $mail->Body = $body;

            $mail->send();
            echo "Iscrizione riuscita! Controlla la tua mail.";
        } catch (Exception $e) {
            echo "Iscrizione riuscita, ma errore nell'invio della mail: {$mail->ErrorInfo}";
        }
    } else {
        echo "Email già iscritta.";
    }
    $stmt->close();
}
$conn->close();
?>