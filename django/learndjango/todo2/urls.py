from django.urls import path
from . import views

app_name='todo2'

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>/delete', views.delete_todo, name='delete_todo'),
    path('<int:id>/update', views.update_todo, name='update_todo'),
    path('<int:id>', views.todo_details, name='todo_details'),
    path('create', views.create_todo, name='create_todo'),
]