<?php
include 'conexion.php';

$id = $_POST['id'];

$sql = "DELETE FROM registros WHERE id=?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Registro eliminado";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>