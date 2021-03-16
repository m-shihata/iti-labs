from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = 'categories'
        
    def __str__(self):
        return f"{self.title}"


class Producer(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.id}: {self.name}"


class Language(models.Model):
    long = models.CharField(max_length=50)
    short = models.CharField(max_length=2)
    
    def __str__(self):
        return f"{self.long} ({self.short})"


class Movie(models.Model):
    title = models.CharField(max_length=100)
    overview = models.TextField(max_length=500, null=True)
    production_year = models.IntegerField(default=datetime.now().year)
    categories = models.ManyToManyField(Category, related_name='movies')
    producer = models.ForeignKey(Producer, on_delete=models.CASCADE, null=True, blank=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}"


class Image(models.Model):
    src = models.ImageField(upload_to='netflix/movies/images')

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.src}"


class Video(models.Model):
    src = models.FileField(upload_to='netflix/movies/videos')
    resolutin = models.CharField(max_length=10)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.src}"

    