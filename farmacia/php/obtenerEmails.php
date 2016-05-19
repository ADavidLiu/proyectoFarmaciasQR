<?php
    
    include "conexionBaseEspera.php";

    // Para determinar qué pacientes requieren el medicamento
    $medicamento = $_POST["medicamento"];
    
    $sql = "SELECT * FROM pacientes WHERE medicamentos = '$medicamento'";
    $resultados = $conexion->query($sql);
    $numPacientes = $resultados->num_rows;

    $info = array();

    if ($resultados->num_rows > 0) {
        while($ocurrencia = $resultados->fetch_assoc()) {
            $info[] = array(
                'email' => $ocurrencia["email"],
                'numPacientes' => $numPacientes
            );
        }
        header('Content-Type: application/json');
        echo json_encode($info);
        exit();
    }

    $conexion->close();

?>