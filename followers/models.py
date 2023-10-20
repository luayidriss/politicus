from django.db import models
from django.conf import settings


class UserFollow(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following_set')
    following = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='followers_set')
    
    class Meta:
        unique_together = []

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'
