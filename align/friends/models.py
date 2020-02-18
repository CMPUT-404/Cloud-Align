from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


#class User(AbstractUser):
#    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#    bio = models.TextField(max_length=500, blank=True)
#    host = models.URLField(blank=True, default="127.0.0.1:8000")  # FIXME HARDCODED HOST
#    firstName = models.CharField(max_length=20, blank=True)
#    lastName = models.CharField(max_length=20, blank=True)
#    displayName = models.CharField(max_length=40, blank=True, default="{} {}".format(firstName, lastName))
#    github = models.URLField(blank=True)

class ExtendAuthorModel(models.Model):
    # change to reference host instead of id
    authorID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='authorID')
    friendID = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendID')