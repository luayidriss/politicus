from django.urls import path
from . import views

urlpatterns = [
    path('userfollows/', views.UserFollowListView.as_view(), name='userfollow-list'),
    path('userfollows/<int:pk>/', views.UserFollowDetailView.as_view(), name='userfollow-detail'),
]