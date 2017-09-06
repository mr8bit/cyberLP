from rest_framework import viewsets

from order.api.serializers import *
from order.models import *


class CommentFilesViewSet(viewsets.ModelViewSet):
    queryset = CommentFiles.objects.all()
    serializer_class = CommentFilesSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class StatusNameViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusNameSerializer
