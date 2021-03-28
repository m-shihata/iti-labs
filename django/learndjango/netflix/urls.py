from django.urls import include, path
from . import views

app_name = 'netflix'

urlpatterns = [
    path('movies/', views.retrieve_movies, name='retrieve_movies'),
    path('movies/add/', views.CreateMovie.as_view(), name='create_movie'),
    # path('movies/add/', views.create_movie, name='create_movie'),
    path('movies/<int:id>/', views.retrieve_movie, name='retrieve_movie'),
    path('movies/<int:id>/watch/', views.play_movie, name='play_movie'),
    # path('movies/<int:id>/edit/', views.UpdateMovie.as_view(), name='update_movie'),
    path('movies/<int:id>/edit/', views.update_movie, name='update_movie'),
    path('movies/<int:id>/remove/', views.delete_movie, name='delete_movie'),
    path('api/', include('netflix.api.urls'))
]