from django.urls import path
from . import views

urlpatterns = [
    path('followers/<int:user_id>/', views.UserFollowersListView.as_view(), name='user-followers-list'),
    path('following/<int:user_id>/', views.UserFollowingListView.as_view(), name='user-following-list'),
    path('follow/<int:user_id>/', views.follow_user, name='follow-user'),
    path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow-user'),
]
