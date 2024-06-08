from django.db import models
from django.contrib.auth.models import Group, User

# Create your models here.


class Publication(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    title = models.CharField(max_length=256)
    text = models.CharField(max_length=4096)
    image = models.CharField(max_length=1024)
    
