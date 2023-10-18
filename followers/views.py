from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import UserFollow
from .serializers import UserFollowSerializer
from profiles.models import CustomUser
from django.shortcuts import get_object_or_404

class UserFollowersListView(generics.ListCreateAPIView):
    serializer_class = UserFollowSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, pk=user_id)
        return UserFollow.objects.filter(following=user)

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')
        following_user = get_object_or_404(CustomUser, pk=user_id)
        serializer.save(follower=self.request.user, following=following_user)

class UserFollowingListView(generics.ListCreateAPIView):
    serializer_class = UserFollowSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(CustomUser, pk=user_id)
        return UserFollow.objects.filter(follower=user)

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')
        follower_user = get_object_or_404(CustomUser, pk=user_id)
        serializer.save(follower=follower_user, following=self.request.user)

@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def toggle_follow(request, user_id):
    user_to_follow = get_object_or_404(CustomUser, pk=user_id)
    follower = request.user

    try:
        follow_relationship = UserFollow.objects.get(follower=follower, following=user_to_follow)

        if request.method == 'DELETE':
            follow_relationship.delete()
            return Response({'detail': 'Unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)

    except UserFollow.DoesNotExist:
        if request.method == 'POST':
            serializer = UserFollowSerializer(data={'follower': follower, 'following': user_to_follow})
            if serializer.is_valid():
                serializer.save()
                return Response({'detail': 'Followed successfully'}, status=status.HTTP_201_CREATED)

    return Response({'detail': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
