from django.shortcuts import render,redirect
from django.http.response import JsonResponse
from .models import Cuenta
from ..Dashboard.views import User

# Create your views here.
def Cuentas(request):
    cuentas = Cuenta.objects.values('tipo_cuenta').distinct()
    usuario = User()
    return render(request,'Catalogo.html',{
        'cuentas': cuentas,
        'usuario': usuario
    })


def list_cuentas(request):
    cuentas = list(Cuenta.objects.values())
    data = {'cuentas': cuentas}
    return JsonResponse(data)

def RegistrarCuenta(request):
    codigo = request.POST['txtCodigo']
    nombre = request.POST['txtCuenta']
    tipo = request.POST['txtTipo']
    Cuenta.objects.create(
    codigo_cuenta = codigo,nombre_cuenta=nombre,tipo_cuenta=tipo,
    saldo_cuenta = 0,debe_cuenta=0,haber_cuenta=0)

    return redirect('/Catalogo')
