from django.test import TestCase
from order.models import *


# Create your tests here.
class OrderModelTest(TestCase):
    def test_string_representation(self):
        status = Order(name="Выполнено")
        self.assertEqual(str(status), status.name)
