from django.db import models
# from django.conf import settings
from questions.models import Question

class Response(models.Model):
    response = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    additional_resources = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'Response by {self.user.username} to Question: {self.question.question}'
