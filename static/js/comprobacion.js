function mostrarInforme(id, nombre) {
    // Ocultar todos los informes
    document.getElementById('balance_comprobacion').style.display = 'none';
    document.getElementById('balance_general').style.display = 'none';
    document.getElementById('estado_resultado').style.display = 'none';

    // Mostrar el informe correspondiente al botón presionado
    document.getElementById(id).style.display = 'block';
    document.getElementById('informeSeleccionado').textContent = nombre;
}



