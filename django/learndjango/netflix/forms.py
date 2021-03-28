from django import forms
from django.forms import inlineformset_factory
from .models import Movie, Video, Image



class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = "__all__"


class VideoForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = "__all__"

    @classmethod
    def inline_formset(cls, instance=None, extra=3):
        VideoFormset = inlineformset_factory(Movie, Video, fields=('src', 'resolution',), 
                                        extra=extra, form=cls, can_delete=True)
        return VideoFormset


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = "__all__"

    @classmethod
    def inline_formset(cls, instance=None, extra=3):
        ImageFormset = inlineformset_factory(Movie, Image, fields=('src',),
                                        extra=extra, form=cls, can_delete=True)
        return ImageFormset