<?php
include 'conexion.php';

$busqueda = isset($_GET['busqueda']) ? $_GET['busqueda'] : '';

if (!empty($busqueda)) {
    $sql = "SELECT * FROM registros WHERE nombre LIKE ? ORDER BY fecha_registro DESC";
    $stmt = $conexion->prepare($sql);
    $paramBusqueda = "%$busqueda%";
    $stmt->bind_param("s", $paramBusqueda);
} else {
    $sql = "SELECT * FROM registros ORDER BY fecha_registro DESC";
    $stmt = $conexion->prepare($sql);
}

$stmt->execute();
$resultado = $stmt->get_result();

$registros = array();
while ($fila = $resultado->fetch_assoc()) {
    $registros[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($registros);

$stmt->close();
$conexion->close();
?>