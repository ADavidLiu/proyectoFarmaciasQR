<?php

    include "conexion.php";
        
    $nombre1 = $_POST["nombre1"];
    $nombre2 = $_POST["nombre2"];
    $apellido1 = $_POST["apellido1"];
    $apellido2 = $_POST["apellido2"];
    $id = $_POST["id"];
    $edad = $_POST["edad"];
    $prioridad = $_POST["prioridad"];
    $autorizacion = $_POST["autorizacion"];
    $indicaciones = $_POST["indicaciones"];

    $fechaConsulta = $_POST["fechaConsulta"];
    $fechaConsulta = substr($fechaConsulta, 0, strpos($fechaConsulta, '('));
    $fechaConsulta = date('Y-m-d H:i:s', strtotime($fechaConsulta));

    $entregado = $_POST["entregado"];
    $medicamentos = $_POST["medicamentos"];

    $sql = "INSERT INTO pacientes (nombre1, nombre2, apellido1, apellido2, identificacion, edad, prioridad, autorizacion, fechaConsulta, entregado, medicamentos, horaLlegada, indicaciones) VALUES ('$nombre1', '$nombre2', '$apellido1', '$apellido2', $id, $edad, $prioridad, '$autorizacion', '$fechaConsulta', $entregado, '$medicamentos', NOW(), '$indicaciones')";
    echo $sql;
    echo "Resultado query: " . $conexion->query($sql);
    
    $conexion->close();

?>