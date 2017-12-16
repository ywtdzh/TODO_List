from django.contrib.auth.models import User
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from todolist import models
from rest_framework import serializers, viewsets, routers

from todolist.models import Todo


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'description', 'status', 'priority', 'expiredDate', 'createdAt', 'updatedAt')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class TodoViewSet(viewsets.ModelViewSet):
    model = Todo
    serializer_class = TodoSerializer

    def list(self, request, **kwargs):
        if not request.user.is_authenticated():
            queryset = Todo.objects.none()
        else:
            queryset = request.user.todo_set.all()
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, **kwargs):
        if not request.user.is_authenticated():
            queryset = Todo.objects.none()
        else:
            queryset = request.user.todo_set.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = TodoSerializer(user)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    model = User
    serializer_class = UserSerializer

    def list(self, request, **kwargs):
        if not request.user.is_authenticated():
            queryset = User.objects.none()
            serializer = UserSerializer(queryset, many=True)
        else:
            queryset = request.user
            serializer = UserSerializer(queryset)
        return Response(serializer.data)


defaultRouter = routers.DefaultRouter()
defaultRouter.register(r'todo', TodoViewSet, base_name='todo')
defaultRouter.register(r'user', UserViewSet, base_name='user')
