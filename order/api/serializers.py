from rest_framework import serializers

from order.models import *


class CommentFilesSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='get_filename')
    size = serializers.ReadOnlyField(source='get_file_size')

    class Meta:
        model = CommentFiles
        fields = ('id', 'file', 'name', 'size', 'comment', 'upload_date')


class CommentSerializer(serializers.ModelSerializer):
    files = CommentFilesSerializer(many=True, read_only=True)
    username = serializers.ReadOnlyField(source='get_username')

    class Meta:
        model = Comment
        fields = ('id', 'username', 'description', 'updated', 'user', 'order', 'files')


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'name', 'done', 'task', 'updated')


class TaskSerializer(serializers.ModelSerializer):
    todos = TodoSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'name', 'order', 'creation_date', 'todos', 'description')


class OrderSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    comment = CommentSerializer(many=True, read_only=True)
    status_name = serializers.ReadOnlyField(source='get_status_name')

    class Meta:
        model = Order
        fields = (
            'id', 'name', 'phone', 'email', 'price', 'text_comment', 'status', 'status_name', 'creation_date', 'tasks',
            'comment')


class StatusSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True, read_only=True)

    class Meta:
        model = Status
        fields = ('id', 'name', 'orders',)


class StatusNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('id', 'name',)
