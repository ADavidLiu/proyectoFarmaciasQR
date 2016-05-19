<?php

    include "conexion.php";

    $sql = "select * from pacientes WHERE horaLlegada BETWEEN date_add(NOW(),INTERVAL -2 SECOND) AND NOW();";
    $resultados = $conexion->query($sql);

    $numPacientesNuevos = $resultados->num_rows;

    if ($resultados->num_rows > 0) {
        $info = array();
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info[] = array(
                'nombre1' => $ocurrencia["nombre1"],
                'nombre2' => $ocurrencia["nombre2"],
                'apellido1' => $ocurrencia["apellido1"],
                'apellido2' => $ocurrencia["apellido2"],
                'edad' => $ocurrencia["edad"],
                'id' => $ocurrencia["identificacion"],
                'medicamentos' => $ocurrencia["medicamentos"],
                'autorizacion' => $ocurrencia["autorizacion"],
                'prioridad' => $ocurrencia["prioridad"],
                'fechaConsulta' => $ocurrencia["fechaConsulta"],
                'indicaciones' => $ocurrencia["indicaciones"],
                'numPacientes' => $numPacientesNuevos
            );
        }
        header('Content-Type: application/json');
        echo json_encode($info);
        exit();
    }

    echo $conexion->query($sql);
    
    $conexion->close();

?>