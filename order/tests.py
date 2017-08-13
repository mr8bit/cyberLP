from django.test import TestCase
from order.models import *


# Create your tests here.
class StatusModelTest(TestCase):
    def test_string_representation(self):
        status = Status(name="Выполнено")
        self.assertEqual(str(status), status.name)


class OrderModelTest(TestCase):
    def test_string_representation(self):
        order = Order(name='Василий', phone='88005553535',
                      email='69kissmysausage@gmail.com',
                      price='3999',
                      text_comment='test',
                      status=Status.objects.get(name='Выполнено'))
        self.assertEqual(str(order), "Заказ " + str(order.id))
