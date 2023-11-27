const BalanceComprobacion = async() =>{
  let fecha = document.getElementById('fecha').value;
  try {
    const response = await fetch('http://127.0.0.1:8000//listadoTransacciones/');
    const response2 = await fetch('http://127.0.0.1:8000//listadoCuentas/');
    const data2 = await response2.json();
    const data = await response.json();

    let cuentasMap = new Map();

    // Agregar todas las cuentas al mapa con saldos iniciales en cero
    data2.cuentas.forEach((cuenta) => {
        cuentasMap.set(cuenta.codigo_cuenta, { nombre: cuenta.nombre_cuenta, debe: 0, haber: 0 });
    });

    data.transacciones.forEach((transaccion) => {
        if (transaccion.fecha_transaccion <= fecha) {
            let cuentaId = transaccion.codigo_cuenta_id;
            cuentasMap.get(cuentaId).debe += parseFloat(transaccion.debe_transaccion);
            cuentasMap.get(cuentaId).haber += parseFloat(transaccion.haber_transaccion);
        }
    });
    let content = '';
    cuentasMap.forEach((cuenta, cuentaId) => {
        content += `
            <tr>
                <td>${cuentaId}</td>
                <td>${cuenta.nombre}</td>
                <td>${cuenta.debe.toFixed(2)}</td>
                <td>${cuenta.haber.toFixed(2)}</td>
            </tr>
        `;
    });

    tableBody_balanceComprobacion.innerHTML = content;
} catch (error) {
    console.log(error);
}
calcularTotalesComprobacion('tableBody_balanceComprobacion', 'totalDebeComprobacion', 'totalHaberComprobacion');

}

function calcularTotalesComprobacion(tablaId, totalDebeId, totalHaberId) {
  var totalDebe = 0;
  var totalHaber = 0;

  var tabla = document.getElementById(tablaId);
  var filas = tabla.querySelectorAll("tbody tr");
  filas.forEach(function (fila) {
    var celdas = fila.querySelectorAll("td");
    var debe = parseFloat(celdas[2].textContent);
    var haber = parseFloat(celdas[3].textContent);

    if (!isNaN(debe)) {
      totalDebe += debe;
    }

    if (!isNaN(haber)) {
      totalHaber += haber;
    }
  });

  document.getElementById('totalDebeComprobacion').textContent = totalDebe.toFixed(2);
  document.getElementById('totalHaberComprobacion').textContent = totalHaber.toFixed(2);
}
  