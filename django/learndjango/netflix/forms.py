from django import forms
from .models import Movie, Video, Image


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = "__all__"

class VideoForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = "__all__"

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = "__all__"