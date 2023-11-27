from django.conf import settings
from django.db import models

class Question(models.Model):
    question = models.CharField(max_length = 255, blank=False)
    description = models.TextField(blank=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, default = 1)

    def __str__(self):
        return self.question