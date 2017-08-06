from django.conf.urls import url
from django.contrib import admin
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from page_editor.models import *
from mptt.admin import DraggableMPTTAdmin


# Register your models here.
class PageBrowserAdmin(admin.ModelAdmin):
    actions = []

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_urls(self):
        opts = self.model._meta
        info = opts.app_label, (opts.model_name if hasattr(opts, 'model_name') else opts.module_name)
        return [
            url('^$', self.admin_site.admin_view(self.filebrowser_view), name='{0}_{1}_changelist'.format(*info)),
        ]

    def filebrowser_view(self, request):
        return HttpResponseRedirect(reverse('page_editor:fb_browse'))


admin.site.register(PageBrowser, PageBrowserAdmin)
from django.utils.html import format_html

class MyDraggableMPTTAdmin(DraggableMPTTAdmin):

    def something(self, instance):
        return format_html(
            '<div style="text-indent:{}px">{}</div>',
            instance._mpttfield('level') * self.mptt_level_indent,
            instance.title,  # Or whatever you want to put here
        )
    something.short_description = ('something nice')
admin.site.register(Page, MyDraggableMPTTAdmin)
