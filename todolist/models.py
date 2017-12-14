from django.db import models


# Create your models here.
def check_password(pwd):
    return len(pwd) > 6


class Todo(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    status = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey('User')

    class Meta:
        ordering = ('status', '-updatedAt')


class User(models.Model):
    username = models.CharField(max_length=31, db_index=True, unique=True, blank=False)
    password = models.CharField(max_length=63, validators=[check_password])
    mail = models.CharField(max_length=63, blank=False, unique=True)
