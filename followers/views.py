from rest_framework import generics
from .models import UserFollow
from .serializers import UserFollowSerializer

class UserFollowListView(generics.ListAPIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer

class UserFollowDetailView(generics.RetrieveAPIView):
    queryset = UserFollow.objects.all()
    serializer_class = UserFollowSerializer
