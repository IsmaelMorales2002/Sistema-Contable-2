from django.db import models
from ..Cuenta.models import Cuenta


# Create your models here.
class EstadoResultado(models.Model):
    id_estadoResultado = models.AutoField(auto_created=True,primary_key=True)
    codigo_cuenta = models.ForeignKey(Cuenta,on_delete=models.CASCADE)
    debe_estadoResultado = models.DecimalField(max_digits=8,decimal_places=2)
    haber_estadoResultado = models.DecimalField(max_digits=8,decimal_places=2)

class EstadoComprobacion(models.Model):
    id_estadoComprobacion= models.AutoField(auto_created=True,primary_key=True)
    codigo_cuenta = models.ForeignKey(Cuenta,on_delete=models.CASCADE)
    debe_estadoComprobacion= models.DecimalField(max_digits=8,decimal_places=2)
    haber_estadoComprobacion = models.DecimalField(max_digits=8,decimal_places=2)

class BalanceGeneral(models.Model):
    id_balanceGeneral= models.AutoField(auto_created=True,primary_key=True)
    codigo_cuenta = models.ForeignKey(Cuenta,on_delete=models.CASCADE)
    debe_estadoGeneral= models.DecimalField(max_digits=8,decimal_places=2)
    haber_estadoGeneral = models.DecimalField(max_digits=8,decimal_places=2)

