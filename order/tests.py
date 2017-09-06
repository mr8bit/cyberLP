from django.test import TestCase
from order.models import *
from django.contrib.auth.models import AnonymousUser, User


# Create your tests here.
class StatusModelTest(TestCase):
    def test_string_representation(self):
        status = Status(name="Выполнено")
        self.assertEqual(str(status), status.name)
        self.assertEqual(str(status.color), status.color)


class OrderModelTest(TestCase):
    def test_string_representation(self):
        order = Order(name='Василий', phone='88005553535', email='69kissmysausage@gmail.com', price=3999,
                      text_comment='test',
                      status=Status(name='Выполнено'))
        self.assertEqual(str(order), "Заказ " + str(order.id))
        self.assertEqual(str(order.phone), order.phone)


class TaskModelTest(TestCase):
    def test_string_representation(self):
        task = Task(name='Разработка тестов',
                    order=Order(name='Василий', phone='88005553535', email='69kissmysausage@gmail.com', price=3999,
                                text_comment='test',
                                status=Status(name='Выполнено')))
        self.assertEqual(str(task.name), task.name)


class TodoModelTest(TestCase):
    def test_string_representation(self):
        task = Task(name='Разработка тестов',
                    order=Order(name='Василий', phone='88005553535', email='69kissmysausage@gmail.com', price=3999,
                                text_comment='test',
                                status=Status(name='Выполнено')))
        todo = Todo(name="Купить хлеб", done=False, task=task)
        self.assertEqual(str(todo.name), todo.name)
        self.assertEqual(task, todo.task)

