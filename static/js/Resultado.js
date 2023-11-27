const BalanceResultado = async () => {
  let fecha1 = document.getElementById('fecha1Resultado').value;
  let fecha2 = document.getElementById('fecha2Resultado').value;
  const cuentasPermitidas = ['5103', '5104', '5101', '5102', '4102', '4103', '4101'];

  try {
    const response = await fetch('http://127.0.0.1:8000//listadoTransacciones/');
    const response2 = await fetch('http://127.0.0.1:8000//listadoCuentas/');
    const data2 = await response2.json();
    const data = await response.json();

    let cuentasMapResultado = new Map();

    // Agregar solo las cuentas permitidas al mapa con saldos iniciales en cero
    data2.cuentas.forEach((cuenta) => {
      if (cuentasPermitidas.includes(cuenta.codigo_cuenta)) {
        cuentasMapResultado.set(cuenta.codigo_cuenta, { nombre: cuenta.nombre_cuenta, debe: 0, haber: 0 });
      }
    });

    data.transacciones.forEach((transaccion) => {
      const fechaTransaccion = new Date(transaccion.fecha_transaccion);
      if (
        fechaTransaccion >= new Date(fecha1) &&
        fechaTransaccion <= new Date(fecha2) &&
        cuentasPermitidas.includes(transaccion.codigo_cuenta_id)
      ) {
        let cuentaId = transaccion.codigo_cuenta_id;
        cuentasMapResultado.get(cuentaId).debe += parseFloat(transaccion.debe_transaccion);
        cuentasMapResultado.get(cuentaId).haber += parseFloat(transaccion.haber_transaccion);
      }
    });


    let content = '';
    cuentasMapResultado.forEach((cuenta, cuentaId) => {

      /// mayorizacion de las cuentas
      if (cuenta.debe > cuenta.haber) {
        cuenta.debe = cuenta.debe - cuenta.haber;
        cuenta.haber = 0;
      }
      if (cuenta.haber > cuenta.debe) {
        cuenta.haber = cuenta.haber - cuenta.debe;
        cuenta.debe = 0;
      }
      if (cuenta.debe == cuenta.haber) {
        cuenta.debe = 0;
        cuenta.haber = 0;
      }
      ///fin de la maytorizacion

      content += `
            <tr>
              <td>${cuentaId}</td>
              <td>${cuenta.nombre}</td>
              <td>${cuenta.debe.toFixed(2)}</td>
              <td>${cuenta.haber.toFixed(2)}</td>
            </tr>
          `;
    });

    tableBody_balanceResultado.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
  calcularTotalesResultado('tableBody_balanceResultado', 'totalDebeResultado', 'totalHaberResultado');
}


async function calcularTotalesResultado(tablaId, totalDebeId, totalHaberId) {
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

  document.getElementById('totalDebeResultado').textContent = totalDebe.toFixed(2);
  document.getElementById('totalHaberResultado').textContent = totalHaber.toFixed(2);
  let resultadoUtilidad = totalHaber - totalDebe
  document.getElementById('resultadoUtilidad').textContent = resultadoUtilidad


}