from django.urls import path
from . import views

app_name = 'netflix'

urlpatterns = [
    path('movies', views.retrieve_movies, name='retrieve_movies'),
    path('movies/create', views.create_movie, name='create_movie'),
    path('movies/<int:id>', views.retrieve_movie, name='retrieve_movie'),
    path('movies/<int:id>/play', views.play_movie, name='play_movie'),
    path('movies/<int:id>/update', views.update_movie, name='update_movie'),
    path('movies/<int:id>/delete', views.delete_movie, name='delete_movie')
]