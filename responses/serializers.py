from rest_framework import serializers
from .models import Response, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = Response
        fields = '__all__'

    def validate(self, data):
        response = data.get('response', '')

        if not response:
            raise serializers.ValidationError("Response cannot be empty.")

        return data


