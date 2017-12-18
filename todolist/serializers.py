from django.contrib.auth.models import User
from rest_framework import serializers

from todolist import models


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'description', 'status', 'priority', 'expiredDate', 'createdAt', 'updatedAt')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
