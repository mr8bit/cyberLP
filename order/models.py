from colorfield.fields import ColorField
from django.db import models

from notifications.mail import sendEmailViaTemplate


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
    email = models.EmailField(verbose_name="Почта", null=True, blank=True)
    price = models.IntegerField(verbose_name="Цена", null=True, blank=True)
    text_comment = models.TextField(verbose_name="Комментарий", null=True, blank=True)
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status = models.ForeignKey('Status', related_name='orders', default=1, verbose_name="Статус")

    def get_status_name(self):
        return self.status.name

    def get_status_color(self):
        return self.status.color

    class Meta:
        ordering = ['-creation_date']
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return "Заказ " + str(self.id)

    def save(self, *args, **kwargs):
        try:
            Order.objects.get(id=self.id)
            models.Model.save(self, *args, **kwargs)
        except Order.DoesNotExist:
            sendEmailViaTemplate(self.name, self.phone, self.text_comment)
            models.Model.save(self, *args, **kwargs)


class Task(models.Model):
    name = models.CharField(verbose_name="Название", max_length=300)
    order = models.ForeignKey('Order', related_name='tasks')
    creation_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    description = models.TextField(verbose_name="Описание", default='', null=True, blank=True)

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def __str__(self):
        return self.name


class Todo(models.Model):
    name = models.CharField(verbose_name="Название", max_length=300)
    done = models.BooleanField(verbose_name="Завершено")
    updated = models.DateTimeField(auto_now_add=True)
    task = models.ForeignKey('order.Task', related_name='todos', default='')

    class Meta:
        verbose_name = "Список"
        verbose_name_plural = "Списки"

    def __str__(self):
        return self.name


class Comment(models.Model):
    description = models.TextField(verbose_name="Описание")
    updated = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('auth.User')
    order = models.ForeignKey('order.Order', related_name='comment')

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"

    def get_username(self):
        return self.user.first_name

    def __str__(self):
        return self.description[:10]


class CommentFiles(models.Model):
    file = models.FileField(verbose_name="Файл")
    comment = models.ForeignKey("Comment", related_name='files')
    upload_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def get_filename(self):
        return self.file.name

    def get_file_size(self):
        return self.file.size
