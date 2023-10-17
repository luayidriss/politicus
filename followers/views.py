from rest_framework import generics
from .models import UserFollow
from .serializers import UserFollowSerializer
from profiles.models import CustomUser
from django.shortcuts import get_object_or_404

class UserFollowersListView(generics.ListAPIView):
    serializer_class = UserFollowSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, pk=user_id)
        return UserFollow.objects.filter(following=user)

class UserFollowingListView(generics.ListAPIView):
    serializer_class = UserFollowSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, pk=user_id)
        return UserFollow.objects.filter(follower=user)