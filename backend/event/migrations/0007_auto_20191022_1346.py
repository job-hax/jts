# Generated by Django 2.2 on 2019-10-22 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_auto_20191021_2253'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
