const txtCodigoVenta = document.getElementById("txtCodigoVenta");
const txtProductoVenta = document.getElementById("txtProductoVenta");

txtCodigoVenta.addEventListener("input", () => {
  const codigo = txtCodigoVenta.value;
  if (codigo.trim() !== "") {
    // Realizar una solicitud al servidor para obtener la lista de productos
    fetch("http://127.0.0.1:8000/listadoProductos/")
      .then(response => response.json())
      .then(data => {
        // Buscar el producto en la lista de productos
        const productoEncontrado = data.productos.find(producto => producto.id_producto == codigo);
        if (productoEncontrado) {
          // Si se encuentra un producto, muestra su nombre en el campo txtProducto
          txtProductoVenta.value = productoEncontrado.nombre_producto;
          txtProductoVenta.disabled = true; // Deshabilita el campo txtProducto
        } else {
          // Si no se encuentra el producto, muestra un mensaje de error en el campo txtProducto
          txtProductoVenta.value = "Producto no encontrado";
          txtProductoVenta.disabled = true; // Habilita el campo txtProducto
          txtProductoVenta.value = ""
        }
      })
      .catch(error => {
        console.error("Error al buscar el producto: " + error);
        // En caso de error en la solicitud, muestra un mensaje de error en el campo txtProducto
        txtProductoVenta.value = "Error al buscar el producto";
        txtProductoVenta.disabled = false; // Habilita el campo txtProducto
      });
  } else {
    // Si el campo txtCodigo está vacío, deja el campo txtProducto en blanco y habilitado
    txtProductoVenta.value = "";
    txtProductoVenta.disabled = false; // Habilita el campo txtProducto
  }
});