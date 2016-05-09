<?php

    include "conexionBaseEspera.php";

    $email = $_POST["emailIn"];
    $medicamentos = $_POST["medicamentosIn"];

    $sql = "INSERT INTO pacientes (email, medicamentos) VALUES ('$email', '$medicamentos')";

    echo $conexion->query($sql);
    
    $conexion->close();

?>