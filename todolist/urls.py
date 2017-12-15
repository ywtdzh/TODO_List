from django.conf.urls import url
from . import views
from . import routers
urlpatterns = [
    url(r'^login/', routers.login_api),
    url(r'^logout/', routers.logout_api),
    url(r'^register/', routers.logout_api),
    url(r'^404/', views.not_found),
    url(r'index(?:.htm(?:l)?)?', views.index),
]
