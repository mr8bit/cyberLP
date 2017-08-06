from django.db import models


class Status(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=300)

    class Meta:
        verbose_name = "Cтатус"
        verbose_name_plural = "Статусы"

    def __str__(self):
        return self.name


# Create your models here.
class Order(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=300)
    phone = models.CharField(verbose_name="Телефон", max_length=100)
    email = models.EmailField(verbose_name="Почта")
    price = models.IntegerField(verbose_name="Цена", null=True, blank=True)
    comment = models.TextField(verbose_name="Комментарий")
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status = models.ForeignKey('Status', related_name='orders')

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return "Закз " + str(self.id)
