from django.shortcuts import render,redirect
from multiprocessing.managers import BaseManager
from ..Usuario.models import Usuario

# Create your views here.

usuarioGlobal = ''
u = ''

def home(request):
    global u
    u = usuarioGlobal
    return render(request,"Inicio.html",{
        'usuario': usuarioGlobal
    })

def User():
    return u


def Login(request):
    return render(request,"Login.html")

def Informacion(request):
    return render(request,'Informacion.html',{
        'usuario': usuarioGlobal
    })

def Libro(request):
    return render(request,'Libro.html',{
        'usuario': usuarioGlobal
    })

def ValidarUsuario(request):
    nombre_usuario =  request.GET['txtUsuario']
    password = request.GET['txtPassword']
    usuario = Usuario.objects.filter(usuario = nombre_usuario, password = password)
    global usuarioGlobal
    usuarioGlobal = usuario
    if usuario:
        return redirect(home)
    else:
        return redirect('/',{'incorrecto': 'Usuario y Contraseña Incorrecta'})