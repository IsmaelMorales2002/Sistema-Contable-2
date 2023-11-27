const BalanceGeneral = async () => {
  let fecha1 = document.getElementById('fechaGeneral').value;
  const cuentasPermitidas = ['1101', '1102', '1103', '1104', '1201', '2101', '2102', '3101', '3102', '3103'];

  try {
    const response = await fetch('http://127.0.0.1:8000//listadoTransacciones/');
    const response2 = await fetch('http://127.0.0.1:8000//listadoCuentas/');
    const data2 = await response2.json();
    const data = await response.json();

    let cuentasMapGeneral = new Map();
    let lastCategory = ''; // Variable para hacer un seguimiento de la última categoría

    data2.cuentas.forEach((cuenta) => {
      if (cuentasPermitidas.includes(cuenta.codigo_cuenta)) {
        cuentasMapGeneral.set(cuenta.codigo_cuenta, { nombre: cuenta.nombre_cuenta, debe: 0, haber: 0, tipo: cuenta.tipo_cuenta });
      }
    });

    let content = '';

    data.transacciones.forEach((transaccion) => {
      const fechaTransaccion = new Date(transaccion.fecha_transaccion);
      if (fechaTransaccion <= new Date(fecha1) && cuentasPermitidas.includes(transaccion.codigo_cuenta_id)) {
        let cuentaId = transaccion.codigo_cuenta_id;
        cuentasMapGeneral.get(cuentaId).debe += parseFloat(transaccion.debe_transaccion);
        cuentasMapGeneral.get(cuentaId).haber += parseFloat(transaccion.haber_transaccion);
      }
    });

    
    cuentasMapGeneral.forEach((cuenta, cuentaId) => {
      if (cuenta.tipo !== lastCategory) {
        // Agregar el título si la categoría es diferente a la última
        content += `
        <tr>
          <td colspan="4"><strong>${cuenta.tipo}</strong></td>
        </tr>
        `;
        lastCategory = cuenta.tipo; // Actualizar la última categoría
      }

      /// mayorizacion de las cuentas
      if(cuenta.debe>cuenta.haber){
        cuenta.debe=cuenta.debe-cuenta.haber;
        cuenta.haber=0;
      }
      if(cuenta.haber>cuenta.debe){
        cuenta.haber=cuenta.haber-cuenta.debe;
        cuenta.debe=0;
      }
      if(cuenta.debe==cuenta.haber){
        cuenta.debe=0;
        cuenta.haber=0;
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

    tableBody_balanceGeneral.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
  calcularTotalesGeneral('tableBody_balanceGeneral', 'totalDebeGeneral', 'totalHaberGeneral');
}



function calcularTotalesGeneral(tablaId, totalDebeId, totalHaberId) {
  var totalDebe = 0;
  var totalHaber = 0;

  var tabla = document.getElementById(tablaId);
  var filas = tabla.querySelectorAll("tbody tr");

  filas.forEach(function (fila) {
    var celdas = fila.querySelectorAll("td");
    
    // Verificar si la fila contiene valores numéricos
    if (celdas.length === 4) {
      var debe = parseFloat(celdas[2].textContent);
      var haber = parseFloat(celdas[3].textContent);

      if (!isNaN(debe)) {
        totalDebe += debe;
      }

      if (!isNaN(haber)) {
        totalHaber += haber;
      }

    }
  });

  
  document.getElementById('totalDebeGeneral').textContent = totalDebe.toFixed(2);
  document.getElementById('totalHaberGeneral').textContent = totalHaber.toFixed(2);
}