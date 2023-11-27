const txtCodigo = document.getElementById("txtCodigo");
const txtProducto = document.getElementById("txtProducto");

txtCodigo.addEventListener("input", () => {
  const codigo = txtCodigo.value;
  if (codigo.trim() !== "") {
    // Realizar una solicitud al servidor para obtener la lista de productos
    fetch("http://127.0.0.1:8000/listadoProductos/")
      .then(response => response.json())
      .then(data => {
        // Buscar el producto en la lista de productos
        const productoEncontrado = data.productos.find(producto => producto.id_producto == codigo);
        if (productoEncontrado) {
          // Si se encuentra un producto, muestra su nombre en el campo txtProducto
          txtProducto.value = productoEncontrado.nombre_producto;
          txtProducto.disabled = false; // Deshabilita el campo txtProducto
        } else {
          // Si no se encuentra el producto, muestra un mensaje de error en el campo txtProducto
          txtProducto.value = "Producto no encontrado";
          txtProducto.disabled = false; // Habilita el campo txtProducto
          txtProducto.value = ""
        }
      })
      .catch(error => {
        console.error("Error al buscar el producto: " + error);
        // En caso de error en la solicitud, muestra un mensaje de error en el campo txtProducto
        txtProducto.value = "Error al buscar el producto";
        txtProducto.disabled = false; // Habilita el campo txtProducto
      });
  } else {
    // Si el campo txtCodigo está vacío, deja el campo txtProducto en blanco y habilitado
    txtProducto.value = "";
    txtProducto.disabled = false; // Habilita el campo txtProducto
  }
});