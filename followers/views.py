from rest_framework import generics
from .models import UserFollow
from .serializers import UserFollowSerializer

class UserFollowListView(generics.ListCreateAPIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer

class UserFollowDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer
