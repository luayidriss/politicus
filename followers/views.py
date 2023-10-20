from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    user_to_follow = get_object_or_404(CustomUser, pk=user_id)
    follower = request.user
    if UserFollow.objects.filter(follower=follower, following=user_to_follow).exists():
        return Response({'detail': 'You are already following this user.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user_follow, created = UserFollow.objects.get_or_create(follower=follower, following=user_to_follow)
        if created:
            return Response({'detail': 'Followed successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'User follow relationship already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': f'Error creating UserFollow: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    user_to_unfollow = get_object_or_404(CustomUser, pk=user_id)
    follower = request.user

    try:
        follow_relationship = UserFollow.objects.get(follower=follower, following=user_to_unfollow)
        follow_relationship.delete()
        return Response({'detail': 'Unfollowed successfully'}, status=status.HTTP_204_NO_CONTENT)
    except UserFollow.DoesNotExist:
        return Response({'detail': 'You are not following this user.'}, status=status.HTTP_400_BAD_REQUEST)
