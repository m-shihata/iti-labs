from django.urls import include, path
from . import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('movies', views.MovieViewSet)

urlpatterns = [

    # Using model vewset
    # path('', include(router.urls)),


    # Using generic views
    path('movies/', views.ListMovies.as_view()),
    path('movies/create/', views.CreateMovie.as_view()),
    path('movies/<int:pk>/retrieve/', views.RetrieveMovie.as_view()),
    path('movies/<int:pk>/update/', views.UpdateMovie.as_view()),
    path('movies/<int:pk>/delete/', views.DeleteMovie.as_view()),


    # Using views with api_view decorator
    # path('movies/list/', views.list_movies),
    # path('movies/create/', views.create_movie),
    # path('movies/<int:pk>/retrieve/', views.retrieve_movie),
    # path('movies/<int:pk>/update/', views.update_movie),
    # path('movies/<int:pk>/delete/', views.delete_movie),
    # path('register/', views.api_signup),
    # path('login/', obtain_auth_token)
]
