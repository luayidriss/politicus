# from django.conf import settings
from django.db import models

class Question(models.Model):
    question = models.CharField(max_length=255)
    description = models.TextField()
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.question