from rest_framework import serializers
from .models import CustomUser, Question, Response, UserFollow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = '__all__'