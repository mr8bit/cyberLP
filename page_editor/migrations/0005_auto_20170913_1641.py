# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-13 16:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('page_editor', '0004_auto_20170813_0906'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='is_home',
        ),
        migrations.AddField(
            model_name='page',
            name='dynamic',
            field=models.BooleanField(default=False, help_text='Страница с диномическим контентом', verbose_name='Динамическая'),
        ),
        migrations.AddField(
            model_name='page',
            name='html_render',
            field=models.TextField(default=' ', verbose_name='Внутренние элементы'),
        ),
    ]