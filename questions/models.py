from django.db import models
from profiles.models import User

class Question(models.Model):
    question = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.question

