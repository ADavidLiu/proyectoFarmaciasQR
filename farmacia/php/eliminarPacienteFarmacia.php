<?php

    include "conexion.php";

    $autorizacion = $_POST["autorizacionIn"];

    $sql = "DELETE FROM pacientes WHERE autorizacion = '$autorizacion'";

    echo $conexion->query($sql);
    
    $conexion->close();

?>