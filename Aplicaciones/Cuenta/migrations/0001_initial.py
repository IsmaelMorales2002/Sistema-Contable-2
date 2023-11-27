# Generated by Django 4.2.6 on 2023-10-28 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cuenta',
            fields=[
                ('codigo_cuenta', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('nombre_cuenta', models.CharField(max_length=25)),
                ('saldo_cuenta', models.DecimalField(decimal_places=2, max_digits=8)),
                ('tipo_cuenta', models.CharField(max_length=16)),
                ('debe_cuenta', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
                ('haber_cuenta', models.DecimalField(decimal_places=2, max_digits=8, null=True)),
            ],
        ),
    ]
