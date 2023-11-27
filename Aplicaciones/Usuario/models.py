from django.db import models

# Create your models here.
class Usuario(models.Model):
    usuario = models.CharField(max_length=20,primary_key=True)
    nombre_usuario = models.CharField(max_length=50)
    password = models.CharField(max_length=16)
    
