from constance import config
from django.db import models
from django.urls import get_script_prefix
from django.utils.encoding import iri_to_uri
from django.utils.translation import ugettext_lazy as _
from meta.models import ModelMeta
from mptt.models import MPTTModel, TreeForeignKey
from page_editor.widgets import PRNotesField


class PageBrowser(models.Model):
    class Meta:
        managed = False
        verbose_name = ("Редактор файлов")
        verbose_name_plural = ("Редактор файлов")


class Page(MPTTModel, ModelMeta):
    url = models.CharField(_('URL'), max_length=100, db_index=True)
    title = models.CharField(_('title'), max_length=200)
    content = PRNotesField(_('content'), blank=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children',
                            verbose_name='Родительская страница', db_index=True)
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    changed_date = models.DateTimeField(auto_now=True, null=True, blank=True)
    show_in_menu = models.BooleanField(verbose_name="Показывать в меню",
                                       help_text="Показывать данную страницу в меню сайта", default=True)
    dynamic = models.BooleanField(verbose_name="Динамическая", help_text="Страница с диномическим контентом",
                                  default=False)
    static = models.BooleanField(verbose_name="Статическая", help_text="Страница с статическим контентом",
                                  default=True)
    html_render = models.TextField(verbose_name="Внутренние элементы", null=True, blank=True)
    seo_description = models.TextField(verbose_name="SEO Описание", null=True, blank=True)
    seo_keywords = models.TextField(verbose_name="SEO слова", blank=True)

    class Meta:
        verbose_name = ("Cтраница")
        ordering = ('url',)
        verbose_name_plural = ("Страницы")

    def __str__(self):
        return "%s -- %s" % (self.url, self.title)

    _metadata = {
        'title': 'get_seo_title',
        'locale': 'ru_RU',
        'use_title_tag': 'True',
        'keywords':'get_keywords',
        'description':'get_description'
    }

    def get_keywords(self):
        return self.seo_keywords.strip().split(',')

    def get_seo_title(self):
        return self.title + ' | ' + config.NAME_SITE

    def get_absolute_url(self):
        # Handle script prefix manually because we bypass reverse()
        return iri_to_uri(get_script_prefix().rstrip('/') + self.url)

    def get_description(self):
        return self.seo_description