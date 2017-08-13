from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Order)
admin.site.register(Status)
admin.site.register(Task)
admin.site.register(Text)
admin.site.register(Todo)
admin.site.register(Comment)
