let cuentas = []
fetch('http://127.0.0.1:8000/listadoCuentas')
    .then(response => response.json())
    .then(data => {
        cuentas = data.cuentas;
    })
    .catch(error =>{
        alert('Error al obtener la lista de cuentas',error)
    })

let filaCount = 0;

function agregarFila(){
    const tbody = document.getElementById('tablaBody')
    const newRow = tbody.insertRow();

    const codigoCell = newRow.insertCell(0)
    codigoCell.innerHTML = '<input type="text" class="form-control" name="codigo[]" oninput="completarCuenta(this)">';
    const cuentaCell = newRow.insertCell(1);
    cuentaCell.innerHTML = '<input type="text" class="form-control" disabled name="cuenta[]">';
    const debeCell = newRow.insertCell(2);
    debeCell.innerHTML = '<input type="number" class="form-control" name="debe[]" step="0.01" oninput="actualizarTotales()">'
    const haberCell = newRow.insertCell(3);
    haberCell.innerHTML = '<input type="number" name="haber[]" step="0.01" class="form-control" oninput="actualizarTotales()">'
    const accionesCell = newRow.insertCell(4);
    accionesCell.innerHTML = '<button type="button" class="btn btn-danger" onclick="eliminarFila(this)">Eliminar</button>';

    filaCount++;
}

function eliminarFila(button){
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    actualizarTotales();
}

function actualizarTotales(){
    const debeInputs = document.querySelectorAll('input[name="debe[]"]')
    const haberInputs = document.querySelectorAll('input[name="haber[]"]')
    let totalDebe = 0
    let totalHaber = 0

    debeInputs.forEach(input => {
        totalDebe += parseFloat(input.value) || 0;
    })

    haberInputs.forEach(input => {
        totalHaber += parseFloat(input.value) || 0;
    })

    totalDebe = totalDebe.toFixed(2);
    totalHaber = totalHaber.toFixed(2);

    document.getElementById('totalDebe').textContent = totalDebe;
    document.getElementById('totalHaber').textContent = totalHaber;
}

async function completarCuenta(input){
    const codigo = input.value;
    const fila = input.parentNode.parentNode;
    const cuentaInput = fila.cells[1].querySelector('input[name="cuenta[]"]');

    if (codigo) {
        // Buscar la cuenta correspondiente en la lista de cuentas
        const cuentaEncontrada = cuentas.find(cuenta => cuenta.codigo_cuenta === codigo);

        if (cuentaEncontrada) {
            cuentaInput.value = cuentaEncontrada.nombre_cuenta;
        } else {
            cuentaInput.value = 'Cuenta no encontrada';
        }
    } else {
        cuentaInput.value = ''; // Limpiar el campo si no se ingresa código
    }
}