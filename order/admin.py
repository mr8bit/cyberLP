from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Status)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'status')


admin.site.register(Order, OrderAdmin)
