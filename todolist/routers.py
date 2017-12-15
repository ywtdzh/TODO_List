from django.shortcuts import redirect
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from todolist import models
from rest_framework import serializers, viewsets, routers


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'description', 'status', 'createdAt', 'updatedAt')


class TodoViewSet(viewsets.ModelViewSet):
    model = models.Todo
    serializer_class = TodoSerializer

    def list(self, request, **kwargs):
        if not request.user.is_authenticated():
            return redirect(r'todolist.views.not_found')
        queryset = request.user.todo_set.all()
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, **kwargs):
        if not request.user.is_authenticated():
            return redirect(r'todolist.views.not_found')
        queryset = request.user.todo_set.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = TodoSerializer(user)
        return Response(serializer.data)


defaultRouter = routers.DefaultRouter()
defaultRouter.register(r'todo', TodoViewSet, base_name='todo')
