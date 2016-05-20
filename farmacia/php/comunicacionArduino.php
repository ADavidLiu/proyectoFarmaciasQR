<?php

    require "php_serial.class.php";

    $mensaje = $_POST["mensaje"];

    echo $mensaje;

    $serial = new phpSerial();
    $serial->deviceSet("com3");
    $serial->confBaudRate(9600);
    $serial->deviceOpen();

    $serial->sendMessage($mensaje);

    $serial->deviceClose();

?>