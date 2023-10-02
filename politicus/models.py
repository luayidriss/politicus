from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from cloudinary.models import CloudinaryField


class CustomUser(AbstractUser):
    profile_picture = CloudinaryField('image', default = 'placeholder')
    
    def __str__(self):
        return self.username

CustomUser._meta.get_field('groups').remote_field.related_name = 'customuser_groups'
CustomUser._meta.get_field('user_permissions').remote_field.related_name = 'customuser_user_permissions'

class Question(models.Model):
    question = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Response(models.Model):
    response = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE) 
    additional_resources = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'Response by {self.user.username} to Question: {self.question.title}'


class UserFollow(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followers')
    following = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='following')
    
    class Meta:
        unique_together = ['follower', 'following']

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'
