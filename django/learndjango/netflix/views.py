from django.shortcuts import redirect, render
from .models import Movie
from .forms import  MovieForm
# Create your views here.

def retrieve_movies(request):
    movies = Movie.objects.all()
    return render(request, 'netflix/movies.html', {
        "movies": movies
    })


def retrieve_movie(request, id):
    movie = Movie.objects.get(pk=id)
    return render(request, 'netflix/movie_details.html', {
        "movie": movie
    })


def play_movie(request, id):
    movie = Movie.objects.get(pk=id)
    return render(request, 'netflix/player.html', {
        "movie": movie
    })


def create_movie(request):
    form = MovieForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        return redirect('netflix:retrieve_movies')

    return render(request, "netflix/create_movie.html", {
        'form': form
    })


def update_movie(request, id):
    movie = Movie.objects.get(pk=id)
    form = MovieForm(request.POST or None, request.FILES or None, instance=movie)
    if form.is_valid():
        form.save()
        return redirect('netflix:retrieve_movie', movie.id)

    return render(request, 'netflix/update_movie.html', {
        'form': form,
        'movie': movie
    })


def delete_movie(request, id):
    movie = Movie.objects.get(pk=id)
    movie.delete()
    return redirect('netflix:retrieve_movies')

