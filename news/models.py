from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models
from django.template.defaultfilters import slugify
from unidecode import unidecode


# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=300, verbose_name="Название")
    slug = models.SlugField()
    short_description = models.TextField(verbose_name="Короткое описание")
    description = RichTextUploadingField(verbose_name="Статья")
    datetime_create = models.DateTimeField(verbose_name="Дата для публикации", )  # Дата создания

    def save(self, *args, **kwargs):
        self.slug = slugify(unidecode(self.title))
        print(self.slug)
        super(Article, self).save(*args, **kwargs)
