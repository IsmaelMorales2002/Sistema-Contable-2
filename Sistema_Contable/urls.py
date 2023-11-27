"""
URL configuration for Sistema_Contable project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Aplicaciones.Dashboard.views import *
from Aplicaciones.Cuenta.views import *
from Aplicaciones.Transaccion.views import *
from Aplicaciones.Producto.views import *
from Aplicaciones.Estados_Financieros.views import *
from Aplicaciones.Partida.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    #Raiz de la pagina
    path('',Login),
    #Vistas de menu
    path('home/',home),
    path('Catalogo/',Cuentas),
    path('Inventario/',Inventario),
    path('Estados/',Estados),
    path('Informacion/',Informacion),
    path('Libro/',Libro),
    path('CrearPartida/',CrearPartida),
    #Operaciones CRUD
    path('validarUsuario/',ValidarUsuario),
    path('registrarCuenta/',RegistrarCuenta),
    path('registrarCompra/',registrarCompra),
    path('registrarVenta/',registrarVenta),
    path('registrarTransaccion/',registrarTransaccion),
    #data
    path('listadoCuentas/',list_cuentas),
    path('listadoProductos/',list_productos),
    path('listadoTransacciones/',list_transacciones),
    path('utilidad/',guardar_saldoUtilidad)
] + static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)
