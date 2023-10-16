from rest_framework import serializers
from .models import Response
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = Response
        fields = '__all__'