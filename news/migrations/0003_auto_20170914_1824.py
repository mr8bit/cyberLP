# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-14 18:24
from __future__ import unicode_literals

import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_auto_20170913_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(blank=True, null=True, verbose_name='Статья'),
        ),
    ]