from django.db import models
from ..Partida.models import *
from ..Cuenta.models import *
from ..Usuario.models import *

# Create your models here.
class Transaccion(models.Model):
    id_transaccion = models.AutoField(auto_created=True,primary_key=True)
    codigo_cuenta = models.ForeignKey(Cuenta,models.CASCADE)
    usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    n_partida = models.ForeignKey(Partida,null=True,on_delete=models.CASCADE)
    fecha_transaccion = models.DateField(null=True,blank=True)
    descripcion_transaccion = models.CharField(max_length=100)
    debe_transaccion = models.DecimalField(max_digits=8,decimal_places=2)
    haber_transaccion = models.DecimalField(max_digits=8,decimal_places=2)