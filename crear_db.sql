CREATE DATABASE IF NOT EXISTS tarea_escolar;

USE tarea_escolar;

CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    edad INT,
    email VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO registros (nombre, edad, email) VALUES 
('Ana Gómez', 18, 'ana@escuela.com'),
('Luis Martínez', 20, 'luis@escuela.com'),
('Sofía Ramírez', 19, NULL);