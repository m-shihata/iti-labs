from django.urls import include, path
from . import views

app_name = 'todo1'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>', views.delete_todo, name='delete_todo')
]