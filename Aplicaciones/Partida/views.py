from django.shortcuts import render
from .models import Partida
from ..Dashboard.views import User

# Create your views here.
def CrearPartida(request):
    usuario = User()
    return render(request,"Partida.html",{
        'usuario': usuario,
    })

