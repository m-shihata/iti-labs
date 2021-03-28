from django.core.exceptions import ObjectDoesNotExist
from rest_framework import response
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView 
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import viewsets
from netflix.api import serializers

from netflix.models import Movie
from netflix.api.serializers import MovieSerializer, UserSerializer

# @NOTE
# To create a custom permission
# class IsManager(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.has_permission("Netflix.view_movies")


@api_view(['POST',])
def api_signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
        except Exception as e:
            return Response({
                "success": False,
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "success": True,
            "message": "User has been created successfully!"
        }, status=status.HTTP_201_CREATED)

    return Response(data={
        "success": False,
        "errors": serializer.errors     
    })    





''' USING MODEL VEWSET '''

class MovieViewSet(viewsets.ModelViewSet):
    model = Movie
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer



''' USING GENERICS VIEWS '''

class ListMovies(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated,]


class CreateMovie(CreateAPIView):
    serializer_class = MovieSerializer


class RetrieveMovie(RetrieveAPIView):
    lookup_field = 'pk'
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated,]


class UpdateMovie(UpdateAPIView):
    lookup_field = 'pk'
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class DeleteMovie(DestroyAPIView):
    lookup_field = 'pk'
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer



''' USING VIEWS WITH API VIEW DECORATOR '''

@api_view(['GET',])
@permission_classes([IsAuthenticated,])
def list_movies(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(instance=movies, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['POST',])
def create_movie(request):
    serializer = MovieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data={
            "success": True,
            "message": "Movie has been created successfully!"
        }, status=status.HTTP_201_CREATED)
    return Response(data={
        "success": False,
        "errors": serializer.errors     
    })


@api_view(['GET',])
def retrieve_movie(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(instance=movie)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response(data={
            "success": False,
            "error": f"There is no movie with id {pk}"
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT',])
def update_movie(request, pk):
    movie = Movie.objects.get(pk=pk)
    serializer = MovieSerializer(movie, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(data={
            "success": True,
            "message": "Movie has been updated successfully!"
        }, status=status.HTTP_201_CREATED)
    return Response(data= {
        "success": False,
        "errors": serializer.errors     
    })


@api_view(['DELETE',])
def delete_movie(request, pk):
    movie = Movie.objects.get(pk=pk)
    movie.delete()
    return Response(data={
            "success": True,
            "message": "Movie has been deleted successfully!"
        }, status=status.HTTP_200_OK)






 
