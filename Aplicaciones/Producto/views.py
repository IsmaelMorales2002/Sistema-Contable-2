from django.shortcuts import render,redirect
from django.http.response import JsonResponse
from ..Dashboard.views import User
from .models import *

# Create your views here.
user  = ''
def Inventario(request):
    usuario = User()
    global user 
    user = User()
    return render(request,'Inventario.html',{
        'usuario': usuario
    })

def list_productos(request):
    productos = list(Producto.objects.values())
    data = {'productos': productos}
    return JsonResponse(data)

def registrarCompra(request):
    try:
        codigo = request.POST['txtCodigo']
        producto = request.POST['txtProducto']
        proveedor = request.POST['txtProveedor']
        precio = request.POST['numPrecio']
        cantidad = request.POST['numCantidad']

        produc = Producto.objects.get(id_producto=codigo)
        produc.usuario = user[0]
        produc.nombre_producto = producto
        produc.proveedor_producto = proveedor
        produc.precio_producto = precio
        produc.cantidad_producto += int(cantidad)
        produc.save()
    except Producto.DoesNotExist:
        crearProducto = Producto.objects.create(
            id_producto = codigo,
            usuario = user[0],
            nombre_producto = producto,
            proveedor_producto = proveedor,
            precio_producto = precio,
            cantidad_producto = cantidad
        )
    return redirect('/Inventario')

def registrarVenta(request):
    try:
        codigo = request.POST['txtCodigo']
        cantidad = request.POST['numCantidad']

        produc = Producto.objects.get(id_producto=codigo)
        produc.cantidad_producto -= int(cantidad)
        if(produc.cantidad_producto == 0):
            produc.delete()
        else: 
            produc.save()
    except Exception:
        print(Exception)
    return redirect('/Inventario')