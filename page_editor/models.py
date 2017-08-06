from django.db import models

# Create your models here.
from django.db import models
from django.utils.translation import ugettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey


class PageBrowser(models.Model):
    class Meta:
        managed = False
        verbose_name = ("Редактор файлов")
        verbose_name_plural = ("Редактор файлов")


from page_editor.widgets import PRNotesField


class Page(MPTTModel):
    url = models.CharField(_('URL'), max_length=100, db_index=True)
    title = models.CharField(_('title'), max_length=200)
    content = PRNotesField(_('content'), blank=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True)
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    changed_date = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_home = models.BooleanField(editable=True, db_index=True, default=False)

    class Meta:
        managed = False
        verbose_name = ("Cтраница")
        verbose_name_plural = ("Страницы")

    def __str__(self):
        return self.title