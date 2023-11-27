from django.db import models
from ..Usuario.models import Usuario

# Create your models here.
class Producto(models.Model):
    id_producto = models.AutoField(auto_created=True,primary_key=True)
    usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    nombre_producto = models.CharField(max_length=50)
    proveedor_producto = models.CharField(max_length=50)
    precio_producto = models.DecimalField(max_digits=8,decimal_places=2)
    cantidad_producto = models.IntegerField()