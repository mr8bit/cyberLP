from django.apps import AppConfig
from page_editor.settings import NAME_APP


class PageEditorConfig(AppConfig):
    verbose_name = NAME_APP
    name = 'page_editor'
