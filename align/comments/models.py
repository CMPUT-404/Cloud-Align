from django.db import models
from django.utils import timezone
from posts.models import Posts
# Create your models here.
class comments(models.Model):
    # it has a title
	title = models.CharField(max_length=300)
    # it has a author (many to one)
	root = models.ForeignKey(Posts, related_name='comments')
	plainText = models.TextField()
	publish = models.DateTimeField(default=timezone.now)
