from order.models import Order, Status
from rest_framework import serializers


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'name', 'phone', 'email', 'price', 'comment','status','creation_date')


class StatusSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Status
        fields = ('id', 'name', 'orders',)
