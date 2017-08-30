from django.db import models
from colorfield.fields import ColorField
from notifications.mail import sendEmailViaTemplate
from django.contrib import auth


class Status(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=300)
    color = ColorField(default='#FF0000', verbose_name="Цвет")

    class Meta:
        verbose_name = "Cтатус"
        verbose_name_plural = "Статусы"

    def __str__(self):
        return self.name


class Order(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=300)
    phone = models.CharField(verbose_name="Телефон", max_length=100)
    email = models.EmailField(verbose_name="Почта")
    price = models.IntegerField(verbose_name="Цена", null=True, blank=True)
    text_comment = models.TextField(verbose_name="Комментарий")
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status = models.ForeignKey('Status', related_name='orders')

    def get_status_name(self):
        return self.status.name

    class Meta:
        ordering = ['-creation_date']
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return "Заказ " + str(self.id)

    def save(self, *args, **kwargs):
        sendEmailViaTemplate(self.name, self.phone, self.text_comment)
        models.Model.save(self, *args, **kwargs)


class Task(models.Model):
    name = models.CharField(verbose_name="Название", max_length=300)
    order = models.ForeignKey('Order', related_name='tasks')
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    user = models.ForeignKey('auth.User')

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def __str__(self):
        return self.name


class Todo(models.Model):
    name = models.CharField(verbose_name="Название", max_length=300)
    done = models.BooleanField(verbose_name="Завершено")
    updated = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User')
    task = models.ForeignKey('order.Task', related_name='todos', default='')

    class Meta:
        verbose_name = "Список"
        verbose_name_plural = "Списки"

    def __str__(self):
        return self.name


class Text(models.Model):
    description = models.TextField(verbose_name="Описание")
    updated = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User')
    task = models.ForeignKey('order.Task', related_name='texts', default='')

    class Meta:
        verbose_name = "Текст"
        verbose_name_plural = "Тексты"

    def __str__(self):
        return self.description[:10]


class Comment(models.Model):
    description = models.TextField(verbose_name="Описание")
    updated = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User')
    order = models.ForeignKey('order.Order', related_name='comment')

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"

    def __str__(self):
        return self.description[:10]
