# Generated by Django 4.2.13 on 2024-11-13 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiApp', '0003_alter_article_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='thumbnail',
            field=models.ImageField(upload_to='img'),
        ),
    ]