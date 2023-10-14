from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from cloudinary.models import CloudinaryField

class CustomUser(AbstractUser):
    profile_picture = CloudinaryField(
        "profile_picture",
        folder="politicus_avatars",
        null=True,
        blank=True,
    )
    bio = models.TextField(max_length=500, blank=True, null=True)
    email = models.EmailField(max_length=254, unique=True)
    username = models.CharField(max_length=150, unique=True)
    birth_date = models.DateField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    country = models.CharField(max_length=100)

    groups = models.ManyToManyField(Group, related_name="customuser_set", related_query_name="customuser")
    user_permissions = models.ManyToManyField(
        Permission, related_name="customuser_set", related_query_name="customuser"
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["birth_date", "first_name", "last_name", "country"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def age(self):
        today = date.today()
        return (
            today.year -
            self.birth_date.year -
            (
                (today.month, today.day) <
                (self.birth_date.month, self.birth_date.day)
            )
        )
