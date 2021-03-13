from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=50)
    desc = models.TextField(max_length=300)
    completed = models.BooleanField()
    priority = models.IntegerField()


    def __str___(self):
        return f"{self.id}: {self.title}"