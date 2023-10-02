from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from cloudinary.models import CloudinaryField

class User(AbstractUser):
    biography = models.TextField(blank=True)
    profile_image = CloudinaryField('image', default='placeholder')

    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        related_name='customuser_set',  # Use a different related_name
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_set',  # Use a different related_name
        related_query_name='user',
    )

    def __str__(self):
        return self.username
