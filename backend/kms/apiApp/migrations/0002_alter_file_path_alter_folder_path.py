# Generated by Django 4.2.13 on 2024-11-21 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='path',
            field=models.CharField(blank=True, max_length=180, null=True),
        ),
        migrations.AlterField(
            model_name='folder',
            name='path',
            field=models.CharField(blank=True, max_length=180, null=True),
        ),
    ]