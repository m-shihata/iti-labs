from django.shortcuts import get_list_or_404, get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required, permission_required
from .models import Movie, Image, Video
from .forms import  MovieForm, VideoForm, ImageForm

from extra_views import CreateWithInlinesView, UpdateWithInlinesView, InlineFormSetFactory



class VideoInline(InlineFormSetFactory):
    model = Video
    fields = '__all__'
    factory_kwargs = {'extra': 1}


class ImageInline(InlineFormSetFactory):
    model = Image
    fields = '__all__'
    factory_kwargs = {'extra': 1}


class CreateMovie(CreateWithInlinesView):
    model = Movie
    inlines = [VideoInline, ImageInline]
    fields = '__all__'
    template_name = 'netflix/create_movie.html'
    success_url = 'netflix/movies'


# class UpdateMovie(UpdateWithInlinesView):
#     model = Movie
#     inlines = [VideoInline, ImageInline]
#     fields = '__all__'
#     template_name = 'netflix/update_movie.html'



@login_required
@permission_required('netflix.view_movie')
def retrieve_movies(request):
    if request.method == 'GET':
        search = request.GET.get('search', '')
        if search:
            movies = Movie.objects.filter(title__icontains=search)
            print("Yup it' here <===")

        else:
            movies = get_list_or_404(Movie)
        
        return render(request, 'netflix/movies.html', {
            'page_title': 'NETFLIX',
            'search_term': search,
            'movies': movies,
        })


@login_required
@permission_required('netflix.view_movie')
def retrieve_movie(request, id):
    if request.method == 'GET':
        movie = get_object_or_404(Movie, pk=id)
        
        return render(request, 'netflix/movie_details.html', {
            'page_title': movie.title,
            'movie': movie
        })


@login_required
@permission_required('netflix.view_movie')
def play_movie(request, id):
    if request.method == 'GET':
        movie = get_object_or_404(Movie, pk=id)
        
        return render(request, 'netflix/player.html', {
            'page_title': movie.title,
            'movie': movie
        })


# @login_required
# @permission_required('netflix.add_movie')
# def create_movie(request):
#     form = MovieForm(request.POST or None, request.FILES or None)

#     VideoFormset = VideoForm.inline_formset(extra=3)
#     ImageFormset = ImageForm.inline_formset(extra=3)
    
#     print(vars(request), )
#     video_formset = VideoFormset(request.GET or None, request.POST or None, request.FILES or None)
#     image_formset = ImageFormset(request.GET or None, request.POST or None, request.FILES or None)

#     if request.method == 'POST':
#         if form.is_valid() and image_formset.is_valid() and video_formset.is_valid():
#             form.save()

#             for form in image_formset:
#                 form.save()

#             for form in video_formset:
#                 form.save()

#             return redirect('netflix:retrieve_movies')

#     if request.method == 'GET':
#         return render(request, 'netflix/create_movie.html', {
#             'page_title': 'Add movie',
#             'form': form,
#             'inlines': [video_formset, image_formset]
#         })


@login_required
@permission_required('netflix.change_movie')
def update_movie(request, id):
    movie = get_object_or_404(Movie, pk=id)
    form = MovieForm(request.GET or None, request.POST or None, request.FILES or None, instance=movie)
    
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('netflix:retrieve_movie', movie.id)

    if request.method == 'GET':
        return render(request, 'netflix/update_movie.html', {
            'page_title': 'Edit moive',
            'form': form,
            'movie': movie
        })


@login_required
@permission_required('netflix.delete_movie')
def delete_movie(request, id):
    if request.method == 'GET':
        movie = get_object_or_404(Movie, pk=id)
        movie.delete()
        return redirect('netflix:retrieve_movies')
