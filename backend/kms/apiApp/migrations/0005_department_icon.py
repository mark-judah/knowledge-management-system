# Generated by Django 4.2.13 on 2024-11-13 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiApp', '0004_alter_article_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='department',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to='img'),
        ),
    ]