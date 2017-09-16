from django.contrib import admin

from news.models import *


# Register your models here.

class ArticleAdmin(admin.ModelAdmin):
    fields = (
        'title',
        'short_description',
        'description',
        'datetime_create'
    )
    list_display = ('title', 'datetime_create')



admin.site.register(Article, ArticleAdmin)
