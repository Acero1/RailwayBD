// Cargar registros al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarRegistros();
});

// Formulario para agregar
document.getElementById('formAgregar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    
    fetch('php/crear.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nombre=${encodeURIComponent(nombre)}&edad=${encodeURIComponent(edad)}&email=${encodeURIComponent(email)}`
    })
    .then(response => response.text())
    .then(data => {
        alert('Registro agregado correctamente');
        document.getElementById('formAgregar').reset();
        cargarRegistros();
    })
    .catch(error => console.error('Error:', error));
});

// Formulario para editar
document.getElementById('formEditar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const nombre = document.getElementById('editNombre').value;
    const edad = document.getElementById('editEdad').value;
    const email = document.getElementById('editEmail').value;
    
    fetch('php/actualizar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${encodeURIComponent(id)}&nombre=${encodeURIComponent(nombre)}&edad=${encodeURIComponent(edad)}&email=${encodeURIComponent(email)}`
    })
    .then(response => response.text())
    .then(data => {
        alert('Registro actualizado correctamente');
        cerrarModal();
        cargarRegistros();
    })
    .catch(error => console.error('Error:', error));
});

// Función para cargar todos los registros
function cargarRegistros() {
    fetch('php/leer.php')
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('listaRegistros');
        lista.innerHTML = '';
        
        if (data.length === 0) {
            lista.innerHTML = '<p>No hay registros disponibles.</p>';
            return;
        }
        
        data.forEach(registro => {
            const div = document.createElement('div');
            div.className = 'registro';
            div.innerHTML = `
                <div>
                    <strong>${registro.nombre}</strong><br>
                    Edad: ${registro.edad || 'N/A'} | Email: ${registro.email || 'N/A'}
                </div>
                <div class="acciones">
                    <button class="editar" onclick="abrirModalEditar(${registro.id}, '${registro.nombre}', ${registro.edad || 'null'}, '${registro.email || ''}')">Editar</button>
                    <button class="eliminar" onclick="eliminarRegistro(${registro.id})">Eliminar</button>
                </div>
            `;
            lista.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Función para buscar registros
function buscarRegistros() {
    const busqueda = document.getElementById('buscar').value;
    
    fetch(`php/leer.php?busqueda=${encodeURIComponent(busqueda)}`)
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('listaRegistros');
        lista.innerHTML = '';
        
        if (data.length === 0) {
            lista.innerHTML = '<p>No se encontraron registros.</p>';
            return;
        }
        
        data.forEach(registro => {
            const div = document.createElement('div');
            div.className = 'registro';
            div.innerHTML = `
                <div>
                    <strong>${registro.nombre}</strong><br>
                    Edad: ${registro.edad || 'N/A'} | Email: ${registro.email || 'N/A'}
                </div>
                <div class="acciones">
                    <button class="editar" onclick="abrirModalEditar(${registro.id}, '${registro.nombre}', ${registro.edad || 'null'}, '${registro.email || ''}')">Editar</button>
                    <button class="eliminar" onclick="eliminarRegistro(${registro.id})">Eliminar</button>
                </div>
            `;
            lista.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Funciones para el modal de edición
function abrirModalEditar(id, nombre, edad, email) {
    document.getElementById('editId').value = id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editEdad').value = edad;
    document.getElementById('editEmail').value = email;
    document.getElementById('modalEditar').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalEditar').style.display = 'none';
}

// Función para eliminar registro
function eliminarRegistro(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        fetch('php/eliminar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id=${encodeURIComponent(id)}`
        })
        .then(response => response.text())
        .then(data => {
            alert('Registro eliminado correctamente');
            cargarRegistros();
        })
        .catch(error => console.error('Error:', error));
    }
}