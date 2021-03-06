<?php

    require "PHPMailerAutoload.php";
    include "class.phpmailer.php";
    include "class.smtp.php";

    $destinatario = $_POST["email"];
    $imgCodigo = $_POST["codigo"];
    $nombre1 = $_POST["nombre1"];
    $nombre2 = $_POST["nombre2"];
    $apellido1 = $_POST["apellido1"];
    $apellido2 = $_POST["apellido2"];
    $edad = $_POST["edad"];
    $id = $_POST["id"];
    $prioridad = $_POST["prioridad"];
    $dosificacion = $_POST["dosis"];
    $medicamento = $_POST["medicamentos"];
    $autorizacion = $_POST["autorizacion"];

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
    $email->addAddress("$destinatario", 'Paciente');

    $mensaje = "Señor(a) " . $nombre1 . " " . $nombre2 . " " . $apellido1 . " " . $apellido2 . " , identificado(a) con el documento " . $id . ". Descargue la imagen que corresponde a su código QR y que se adjunta a continuación para poder ingresar a su farmacia cualquier día cuando reciba una notificación de disponibilidad de su medicamento. Las indicaciones de su médico con respecto a sus medicamentos son las siguientes: " . $dosificacion;

    $email->Subject = "Nuevo código QR para reclamar medicamentos";
    $email->Body    = "$mensaje";
    $email->AltBody = "$mensaje";

    $data = explode(',', $imgCodigo);
    $imgCodigo = base64_decode($data[1]);

    $email->AddStringAttachment($imgCodigo, 'CódigoQR' . $id . '.png', 'base64', 'image/png');

    if(!$email->send()) {
    echo 'El mensaje no pudo ser enviado!';
    echo 'Error: ' . $email->ErrorInfo;
    } else {
        echo 'El mensaje ha sido enviado';
    }

?>