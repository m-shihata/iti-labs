from django.contrib import admin
from .models import *

class VideoInline(admin.TabularInline):
    model = Video
    extra = 3
    max = 9


class ImageInline(admin.TabularInline):
    model = Image
    extra = 3
    max = 9


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'production_year', 'published')
    list_filter = ('production_year',)
    inlines = [VideoInline, ImageInline]


# Register your models here.
admin.site.register(Movie, MovieAdmin)