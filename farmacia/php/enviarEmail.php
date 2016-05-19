<?php

    require "PHPMailerAutoload.php";
    include "class.phpmailer.php";
    include "class.smtp.php";

    $emails = $_POST["emailsIn"];
    $medicamento = $_POST["medicamento"];

    $direccion = 'email';
    $clave = 'pass';

    $email = new PHPmailer();
    $email->isSMTP();
    $email->CharSet = 'UTF-8';
    $email->Host = 'smtp.mail.yahoo.com';
    $email->SMTPAuth = true;
    $email->Username = $direccion;
    $email->Password = $clave;
    $email->SMTPSecure = 'tls';
    $email->Port = 587;
    $email->setFrom($direccion, 'Farmacia EPS');

    $mensaje = "Le informamos que el medicamento: " . $medicamento . ", ya se encuentra disponible en su farmacia. Por favor acérquese cualquier día para reclamarlo.";

    $email->Subject = "Notificación de disponibilidad de medicamentos";
    $email->Body    = "$mensaje";
    $email->AltBody = "$mensaje";
       
    for ($i = 0; $i < sizeof($emails); $i++) {
        $email->addAddress($emails[$i], 'Paciente');
        if(!$email->send()) {
            echo 'El mensaje no pudo ser enviado!';
            echo 'Error: ' . $email->ErrorInfo;
        } else {
            echo 'El mensaje ha sido enviado';
        }
    }

?>