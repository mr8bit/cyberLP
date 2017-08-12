from django import forms
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from django.db import models
from page_editor.settings import DEFAULT_TEMPLATE, PATH_EDIT
from django.conf import settings


class PRNotesWidget(forms.widgets.Textarea):
    template_name = 'page_editor/contentbuilder/forms.html'

    class Media:
        js = (
                 'page_editor/js/jquery-1.11.1.min.js',
                 'page_editor/js/jquery-ui.min.js',
                 'page_editor/js/load-image.all.min.js',
                 'page_editor/js/contentbuilder.js',

             ) + settings.TEMPLATE_JS

        css = {
            'all': (
                       'page_editor/css/contentbuilder.css',

                       'page_editor/css/icons/css/fontello.css',
                   ) + settings.TEMPLATE_CSS
        }

    def render(self, name, value, attrs=None):
        # read template for editor
        template = open(PATH_EDIT + DEFAULT_TEMPLATE, 'r')
        template_read = template.read()
        template.close()
        context = {
            'template': template_read,
            'snippet': '/static/templates/selecticon.html',
            'locals': locals(),
        }
        return mark_safe(render_to_string(self.template_name, context))


class PRNotesField(models.TextField):
    def formfield(self, **kwargs):
        kwargs['widget'] = PRNotesWidget
        return super(PRNotesField, self).formfield(**kwargs)
