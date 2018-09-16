from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # url(r'$', views.mainView),
    path(r'<int:id>/<str:geoX>/<str:geoY>/<action>', views.log),
    url(r'', views.getID),
    
]