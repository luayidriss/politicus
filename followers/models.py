from django.db import models
from django.conf import settings
# from django.contrib.auth.models import User


class UserFollow(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following_set')
    following = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='followers_set')
    
    class Meta:
        unique_together = ['follower', 'following']

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'
