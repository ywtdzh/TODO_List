import datetime
from django.db import models
from django.contrib.auth.models import User


# Create your models here.


def check_password(pwd):
    return len(pwd) > 6


class Todo(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    status = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)
    expiredDate = models.DateTimeField(default=datetime.datetime.now() + datetime.timedelta(days=3))
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User)

    class Meta:
        ordering = ('status', '-updatedAt')
