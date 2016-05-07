<?php

    require "PHPMailerAutoload.php";
    include "class.phpmailer.php";
    include "class.smtp.php";

    $destinatario = $_POST["destinatario"];
    $imgCodigo = $_POST["codigo"];
    $nombre1 = $_POST["nombre1"];
    $nombre2 = $_POST["nombre2"];
    $apellido1 = $_POST["apellido1"];
    $apellido2 = $_POST["apellido2"];
    $edad = $_POST["edad"];
    $id = $_POST["id"];
    $prioridad = $_POST["prioridad"];
    $dosificacion = $_POST["dosis"];

    $email = new PHPmailer();
    $email->isSMTP();
    $email->CharSet = 'UTF-8';
    $email->Host = 'smtp.mail.yahoo.com';
    $email->SMTPAuth = true;
    $email->Username = 'email';
    $email->Password = 'contraseña';
    $email->SMTPSecure = 'tls';
    $email->Port = 587;
    $email->setFrom('email', 'Médico EPS');
    $email->addAddress("$destinatario", 'Paciente');

    $mensaje = "Señor(a) " . $nombre1 . " " . $nombre2 . " " . $apellido1 . " " . $apellido2 . " , identificado con el documento " . $id . ". Descargue la imagen que corresponde a su código QR y que se adjunta a continuación para poder ingresar a su farmacia en " . $prioridad . " días hábiles. Tenga en cuenta que este mensaje se le fue enviado el: " . date("d/m/Y") . " (día/mes/año). Las indicaciones de su médico son las siguientes: " . $dosificacion;

    $email->Subject = "Código QR para reclamar medicamentos";
    $email->Body    = "$mensaje";
    $email->AltBody = "$mensaje";

    $data = explode(',', $imgCodigo);
    $imgCodigo = base64_decode($data[1]);

    $email->AddStringAttachment($imgCodigo, 'CódigoQR' . $id . '.png', 'base64', 'image/png');

    if(!$email->send()) {
    echo 'El mensaje no pudo ser enviado!';
    //echo 'Error: ' . $email->ErrorInfo;
    } else {
        echo 'El mensaje ha sido enviado';
    }

?>