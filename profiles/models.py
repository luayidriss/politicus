from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission
from django.db import models
import cloudinary
from cloudinary.models import CloudinaryField
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True, null=True)
    email = models.EmailField(max_length=254, unique=True)
    username = models.CharField(max_length=150, unique=True)
    birth_date = models.DateField(null=True, blank=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=100, blank=True)

    groups = models.ManyToManyField(Group, related_name="customuser_set", related_query_name="customuser", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="customuser_set", related_query_name="customuser", blank=True
    )

    date_joined = models.DateTimeField(default=timezone.now)
    last_modified = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "birth_date", "first_name", "last_name", "country"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def age(self):
        today = timezone.now().date()
        return (
            today.year -
            self.birth_date.year -
            (
                (today.month, today.day) <
                (self.birth_date.month, self.birth_date.day)
            )
        )
