<?php
include 'conexion.php';

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$email = $_POST['email'];

$sql = "UPDATE registros SET nombre=?, edad=?, email=? WHERE id=?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sisi", $nombre, $edad, $email, $id);

if ($stmt->execute()) {
    echo "Registro actualizado";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>