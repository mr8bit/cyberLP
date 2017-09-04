from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Status)
admin.site.register(Task)
admin.site.register(Todo)
admin.site.register(Comment)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email','status')

admin.site.register(Order, OrderAdmin)
