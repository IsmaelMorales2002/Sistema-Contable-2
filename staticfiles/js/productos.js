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
    await listProductos();
    dataTable=$('#datatable-productos').DataTable(dataTableOptions)
    dataTableInitialized = true
}

const listProductos = async() =>{
    try {
        const response = await fetch('http://127.0.0.1:8000/listadoProductos/')
        const data = await response.json();
        
        let content = ``;
        data.productos.forEach((producto) => {
            content += `
                <tr>
                    <td>${producto.id_producto}</td>
                    <td>${producto.nombre_producto}</td>
                    <td>${producto.precio_producto}</td>
                    <td>${producto.cantidad_producto}</td>
                    <td>$ ${producto.cantidad_producto * producto.precio_producto}</td>
                </tr>
            `;
        })
        tableBody_productos.innerHTML = content

    } catch (ex) {
        console.error(ex)
    }
}

window.addEventListener('load',async()=>{
    await initDatatable()
})
