from django.contrib import admin

from .models import *


# Register your models here.

class StatusAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')
    search_fields = ('name',)


admin.site.register(Status, StatusAdmin)

admin.site.register(Task)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'status')
    search_fields = ('name', 'phone', 'email', 'text_comment')


admin.site.register(Order, OrderAdmin)
