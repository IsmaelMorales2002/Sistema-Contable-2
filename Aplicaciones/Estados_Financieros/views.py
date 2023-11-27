from django.shortcuts import render
from ..Dashboard.views import User
from ..Cuenta.models import *
from django.http import JsonResponse
# Create your views here.
def Estados(request):
    usuario = User()
    return render(request,'Estados.html',{
        'usuario': usuario,
    })

def guardar_saldoUtilidad(request):
        utilidad = request.POST.get('resultadoUtilidad')
        cuenta = Cuenta.objects.get(codigo_cuenta = 3102)
        print("AQUI ESTA ISMAEL ------------",float(utilidad))
        if cuenta:
            cuenta.saldo_cuenta = float(utilidad)
            cuenta.save()
        else:
            return JsonResponse({'mensaje': 'No se encontro la cuenta'})

