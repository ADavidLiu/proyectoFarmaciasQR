<?php
    // Inicia la conexión predefinida con la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "Simsklapaucius96"; // Password de la base de datos local
    $dbname = "pacientesespera";
    
    // Crea la conexión
    $conexion = new mysqli($servername, $username, $password, $dbname);
?>