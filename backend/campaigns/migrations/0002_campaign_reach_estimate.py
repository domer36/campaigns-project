# Generated by Django 5.1.7 on 2025-04-04 21:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='reach_estimate',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
