from django.shortcuts import render,redirect
from ..Dashboard.views import User
from ..Cuenta.models import *
from ..Partida.models import *
from django.http.response import JsonResponse
from .models import *
from decimal import Decimal


u = ''
# Create your views here.
def registrarTransaccion(request):
    part = request.POST['numPartida']
    fecha = request.POST['fecha']
    descripcion = request.POST['descripcion']
    codigos = request.POST.getlist('codigo[]')
    debe = request.POST.getlist('debe[]')
    haber = request.POST.getlist('haber[]')
    global u
    u = User()


    partida = Partida.objects.create(
        num_partida = part
    )
    
    for codigo, debe_valor, haber_valor in zip(codigos, debe, haber):
        try:
            debe_decimal = Decimal(debe_valor) if debe_valor else Decimal('0')
            haber_decimal = Decimal(haber_valor) if haber_valor else Decimal('0')

            # Buscar la instancia de Cuenta correspondiente al código
            cuenta = Cuenta.objects.get(codigo_cuenta=codigo)

            # Validar que los valores no sean cadenas vacías o no válidas
            if debe_decimal >= 0 and haber_decimal >= 0:
                transaccion = Transaccion(
                    n_partida=partida,
                    fecha_transaccion=fecha,
                    descripcion_transaccion=descripcion,
                    debe_transaccion=debe_decimal,
                    haber_transaccion=haber_decimal,
                    codigo_cuenta=cuenta,
                    usuario=u[0] if u else None,
                )

                if cuenta.tipo_cuenta == 'Activo' or cuenta.tipo_cuenta == 'Gastos y Costo':
                    if debe_decimal == 0:
                        cuenta.saldo_cuenta = cuenta.saldo_cuenta - haber_decimal
                    if haber_decimal == 0:
                        cuenta.saldo_cuenta = cuenta.saldo_cuenta + debe_decimal
                
                if cuenta.tipo_cuenta == 'Patrimonio' and cuenta.nombre_cuenta == 'Utilidad del Ejercicio':
                    cuenta.saldo_cuenta = haber_decimal

                if cuenta.tipo_cuenta == 'Pasivo' or cuenta.tipo_cuenta == 'Patrimonio' or cuenta.tipo_cuenta == 'Ingresos':
                    if debe_decimal == 0:
                        cuenta.saldo_cuenta = cuenta.saldo_cuenta + haber_decimal
                    if haber_decimal == 0:
                        cuenta.saldo_cuenta = cuenta.saldo_cuenta - debe_decimal
                
                

                
                    

                cuenta.save()
                transaccion.save()
        except (ValueError):
            # Maneja el caso en el que los valores no son números decimales válidos
            pass
    return redirect('/CrearPartida')

def list_transacciones(request):
    transacciones = list(Transaccion.objects.values())
    data = {'transacciones': transacciones}
    return JsonResponse(data)