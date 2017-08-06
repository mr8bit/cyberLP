from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField


class Reviews(models.Model):
    name = models.CharField(max_length=300, verbose_name="Имя")
    comment = RichTextUploadingField(verbose_name="Статья")
    datetime_create = models.DateTimeField(auto_now_add=True)  # Дата создания


class Characteristic(models.Model):
    name = models.CharField(max_length=300, verbose_name="Название")
    value = models.CharField(max_length=300, verbose_name="Значение")
    product = models.ForeignKey("Product")


class Product(models.Model):
    name = models.CharField(max_length=300, verbose_name="Имя")
    description = RichTextUploadingField(verbose_name="Статья")
