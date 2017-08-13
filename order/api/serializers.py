from order.models import *
from rest_framework import serializers


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'description', 'updated', 'user')


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('id', 'description', 'updated', 'user')


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'name', 'done', 'updated')


class TaskSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)
    texts = TextSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'name', 'order', 'creation_date', 'user', 'todos', 'texts')


class OrderSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    comment = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
        'id', 'name', 'phone', 'email', 'price', 'text_comment', 'status', 'creation_date', 'tasks', 'comment')


class StatusSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Status
        fields = ('id', 'name', 'orders',)
