<?php
include 'conexion.php';

$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$email = $_POST['email'];

$sql = "INSERT INTO registros (nombre, edad, email) VALUES (?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sis", $nombre, $edad, $email);

if ($stmt->execute()) {
    echo "Registro creado";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>