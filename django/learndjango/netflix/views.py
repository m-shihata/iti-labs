from django.shortcuts import get_list_or_404, get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.models import User
from .models import Movie
from .forms import  MovieForm


@login_required
@permission_required('netflix.view_movie')
def retrieve_movies(request):
    search = request.GET.get('search', None)
    if search:
        movies = Movie.objects.filter(title__icontains=search)
        print("Yup it' here <===")

    else:
        movies = get_list_or_404(Movie)
    
    return render(request, 'netflix/movies.html', {
        'page_title': 'NETFLIX',
        'movies': movies
    })


@login_required
@permission_required('netflix.view_movie')
def retrieve_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    
    return render(request, 'netflix/movie_details.html', {
        'page_title': movie.title,
        'movie': movie
    })


@login_required
@permission_required('netflix.view_movie')
def play_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    
    return render(request, 'netflix/player.html', {
        'page_title': movie.title,
        'movie': movie
    })


@login_required
@permission_required('netflix.add_movie')
def create_movie(request):
    form = MovieForm(request.POST or None, request.FILES or None)
    
    if form.is_valid():
        form.save()
        return redirect('netflix:retrieve_movies')

    return render(request, 'netflix/create_movie.html', {
        'page_title': 'Add movie',
        'form': form
    })


@login_required
@permission_required('netflix.change_movie')
def update_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    form = MovieForm(request.POST or None, request.FILES or None, instance=movie)
    
    if form.is_valid():
        form.save()
        return redirect('netflix:retrieve_movie', movie.id)

    return render(request, 'netflix/update_movie.html', {
        'page_title': 'Edit moive',
        'form': form,
        'movie': movie
    })


@login_required
@permission_required('netflix.delete_movie')
def delete_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    movie.delete()
    return redirect('netflix:retrieve_movies')

