from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.
class Posts(models.Model):
    # it has a title
	title = models.CharField(max_length=300)
    # it has a author (many to one)
	author = models.ForeignKey(User, related_name='posts')
    # it has a authority
    # 0 = public
    # 1 = friend only
    # 2 = people who are assigned(by default yourself)
    # 3 = private and only by urls
    authorization = 0
	plainText = models.TextField()
    images = models.ImageField(blank=True)
	publish = models.DateTimeField(default=timezone.now)
