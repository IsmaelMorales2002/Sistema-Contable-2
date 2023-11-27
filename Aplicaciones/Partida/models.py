from django.db import models

# Create your models here.
class Partida(models.Model):
    id_partida = models.AutoField(primary_key=True)
    num_partida = models.IntegerField(default=0)