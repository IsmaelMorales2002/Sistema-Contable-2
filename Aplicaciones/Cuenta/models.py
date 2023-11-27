from django.db import models
# Create your models here.
class Cuenta(models.Model):
    codigo_cuenta = models.CharField(max_length=16,primary_key=True)
    nombre_cuenta = models.CharField(max_length=25)
    saldo_cuenta = models.DecimalField(max_digits=8,decimal_places=2)
    tipo_cuenta = models.CharField(max_length=16)
    debe_cuenta = models.DecimalField(max_digits=8,null=True,decimal_places=2)
    haber_cuenta = models.DecimalField(max_digits=8,null=True,decimal_places=2)


    