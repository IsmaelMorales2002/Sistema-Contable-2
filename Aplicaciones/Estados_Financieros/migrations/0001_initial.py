# Generated by Django 4.2.6 on 2023-10-28 08:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Cuenta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EstadoResultado',
            fields=[
                ('id_estadoResultado', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('debe_estadoResultado', models.DecimalField(decimal_places=2, max_digits=8)),
                ('haber_estadoResultado', models.DecimalField(decimal_places=2, max_digits=8)),
                ('codigo_cuenta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cuenta.cuenta')),
            ],
        ),
        migrations.CreateModel(
            name='EstadoComprobacion',
            fields=[
                ('id_estadoComprobacion', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('debe_estadoComprobacion', models.DecimalField(decimal_places=2, max_digits=8)),
                ('haber_estadoComprobacion', models.DecimalField(decimal_places=2, max_digits=8)),
                ('codigo_cuenta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cuenta.cuenta')),
            ],
        ),
        migrations.CreateModel(
            name='BalanceGeneral',
            fields=[
                ('id_balanceGeneral', models.AutoField(auto_created=True, primary_key=True, serialize=False)),
                ('debe_estadoGeneral', models.DecimalField(decimal_places=2, max_digits=8)),
                ('haber_estadoGeneral', models.DecimalField(decimal_places=2, max_digits=8)),
                ('codigo_cuenta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cuenta.cuenta')),
            ],
        ),
    ]
