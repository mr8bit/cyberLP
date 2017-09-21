import random

from order.models import *


def generate_name():
    first_name = ["Василий", "Антон", "Сергей", "Александр", "Артемий", "Олег", "Дмитрий", "Алексей", "Илья"]
    second_name = ["Маяковский", "Иванов", "Махнев", "Мазнюк", "Кабак", "Залеткин", "Мазаев", "Платонов"]
    id_first_name = random.randint(0, len(first_name) - 1)
    id_second_name = random.randint(0, len(second_name) - 1)
    return '{0} {1}'.format(first_name[id_first_name], second_name[id_second_name])


def generate_phone():
    return "{0}{1}{2}{3}{4}".format(8, random.randint(915, 999), random.randint(100, 999), random.randint(10, 99),
                                    random.randint(10, 99))


def create_new_order(count=1):
    len_status = len(Status.objects.all()) - 1
    while (count > 0):
        new_order = Order.objects.create()
        new_order.name = generate_name()
        new_order.phone = generate_phone()
        new_order.status = Status.objects.get(id=random.randint(1, len_status))
        new_order.save()
        print(
            "Заказ: {0}, покупатель {1}, телефон {2}, статус {3}".format(new_order.id, new_order.name, new_order.phone,
                                                                         new_order.status))
        count -= 1
