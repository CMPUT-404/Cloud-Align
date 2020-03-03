# Generated by Django 2.1.5 on 2020-02-28 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='displayName',
            field=models.CharField(blank=True, default='<django.db.models.fields.CharField> <django.db.models.fields.CharField>', max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='firstName',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='github',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='host',
            field=models.URLField(blank=True, default='127.0.0.1:8000', null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='lastName',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]