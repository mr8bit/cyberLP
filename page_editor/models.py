from django.db import models
from django.utils.translation import ugettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from django.utils.encoding import iri_to_uri
from page_editor.widgets import PRNotesField
from django.urls import get_script_prefix


class PageBrowser(models.Model):
    class Meta:
        managed = False
        verbose_name = ("Редактор файлов")
        verbose_name_plural = ("Редактор файлов")


class Page(MPTTModel):
    url = models.CharField(_('URL'), max_length=100, db_index=True)
    title = models.CharField(_('title'), max_length=200)
    content = PRNotesField(_('content'), blank=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children',
                            verbose_name='Родительская страница', db_index=True)
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    changed_date = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_home = models.BooleanField(verbose_name='Главная', editable=True, db_index=True, default=False)

    class Meta:
        verbose_name = ("Cтраница")
        ordering = ('url',)
        verbose_name_plural = ("Страницы")

    def __str__(self):
        return "%s -- %s" % (self.url, self.title)

    def get_absolute_url(self):
        # Handle script prefix manually because we bypass reverse()
        return iri_to_uri(get_script_prefix().rstrip('/') + self.url)
