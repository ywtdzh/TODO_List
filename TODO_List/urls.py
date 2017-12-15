from django.conf.urls import include, url
from django.contrib import admin
from todolist import routers

urlpatterns = [
    # Examples:
    # url(r'^$', 'TODO_List.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^rest-api/', include(routers.defaultRouter.urls)),
    url(r'^rest/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'', include('todolist.urls')),
]
