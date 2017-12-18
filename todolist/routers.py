from rest_framework import routers

from todolist.viewsets import TodoViewSet, UserViewSet

defaultRouter = routers.DefaultRouter()
defaultRouter.register(r'todo', TodoViewSet, base_name='todo')
defaultRouter.register(r'user', UserViewSet, base_name='user')
