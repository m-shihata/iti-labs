from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>', views.delete_todo, name='delete_todo')
]