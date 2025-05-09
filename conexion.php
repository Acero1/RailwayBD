<?php
$servidor = "localhost";
$usuario = "root"; // Cambia esto según tu configuración
$contrasena = ""; // Cambia esto según tu configuración
$basedatos = "tarea_escolar";

$conexion = new mysqli($servidor, $usuario, $contrasena, $basedatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>