from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def validate_question(self, value):
        if not value:
            raise serializers.ValidationError("Question cannot be empty.")
        return value

    def validate_description(self, value):
        if not value:
            raise serializers.ValidationError("Description cannot be empty.")
        return value
