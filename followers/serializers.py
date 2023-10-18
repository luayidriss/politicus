from rest_framework import serializers
from .models import UserFollow

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = '__all__'
        read_only_fields = ['follower', 'following']

