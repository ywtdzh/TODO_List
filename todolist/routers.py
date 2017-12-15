from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from todolist import models
from rest_framework import serializers, viewsets, routers


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Todo
        fields = ('title', 'description', 'status', 'createdAt', 'updatedAt')


class TodoViewSet(viewsets.ModelViewSet):
    model = models.Todo
    serializer_class = TodoSerializer

    def list(self, request, **kwargs):
        if not request.user.is_authenticated():
            return redirect(r'todolist.views.not_found')
        queryset = models.Todo.objects.all()
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, **kwargs):
        if not request.user.is_authenticated():
            return redirect(r'todolist.views.not_found')
        queryset = models.Todo.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = TodoSerializer(user)
        return Response(serializer.data)


def login_api(request):
    username = request.GET['username']
    password = request.GET['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return HttpResponse('login successfully')
        else:
            return HttpResponse('disabled account')
    else:
        return HttpResponse('invalid login')


@login_required()
def logout_api(request):
    logout(request)
    return HttpResponse('logged out')


def register_api(request):
    username = request.GET['username']
    password = request.GET['password']
    email = request.GET['email']
    if User.objects.filter(username=username).__len__() > 0:
        return HttpResponse('username has existed')
    elif User.objects.filter(email=email).__len__() > 0:
        return HttpResponse('email has existed')
    new_user = User(username=username, password=password, email=email)
    new_user.save()
    return HttpResponse('Register complete')


defaultRouter = routers.DefaultRouter()
defaultRouter.register(r'todo', TodoViewSet, base_name='todo')
