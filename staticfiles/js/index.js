let dataTable;
let dataTableInitialized = false

const dataTableOptions = {
    columnDefs: [
        {className: 'centered',targets: [0,1,2]},
    ],
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún registro encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún registro encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando ...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
}

const initDatatable = async() => {
    if(dataTableInitialized){
        dataTable.destroy()
    }
    await listCuentas();
    dataTable=$('#datatable-cuentas').DataTable(dataTableOptions)
    dataTableInitialized = true
}

const listCuentas = async() =>{
    try {
        const response = await fetch('http://127.0.0.1:8000/listadoCuentas')
        const data = await response.json();
        
        let content = ``;
        data.cuentas.forEach((cuenta) => {
            content += `
                <tr>
                    <td>${cuenta.codigo_cuenta}</td>
                    <td>${cuenta.nombre_cuenta}</td>
                    <td>${cuenta.tipo_cuenta}</td>
                </tr>
            `;
        })
        tableBody_cuentas.innerHTML = content

    } catch (ex) {
        alert(ex)
    }
}

window.addEventListener('load',async()=>{
    await initDatatable()
})
