from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Reviews)


class CharacteristicsAdmin(admin.StackedInline):
    model = Characteristic
    extra = 0
    fields = (
        'name',
        'value',
    )
    show_change_link = True


class ProductsAdmin(admin.ModelAdmin):
    model = Product
    inlines = (CharacteristicsAdmin,)

admin.site.register(Product,ProductsAdmin)