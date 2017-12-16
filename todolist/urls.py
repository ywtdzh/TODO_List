from django.conf.urls import url
from . import views
from . import fixedApi
urlpatterns = [
    url(r'^login', fixedApi.login_api),
    url(r'^logout', fixedApi.logout_api),
    url(r'^register', fixedApi.register_api),
    url(r'^validate-status', fixedApi.validate_status_api),
    url(r'^todo/post', fixedApi.post_todo_api),
    url(r'^todo/status', fixedApi.change_todo_status_api),
    url(r'^todo/del', fixedApi.del_todo_api),
    url(r'^todo/edit', fixedApi.edit_api),
    url(r'^page/login', views.login_page),
    url(r'^index(?:.htm(?:l)?)?', views.index),
]
