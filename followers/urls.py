from django.urls import path
from . import views

urlpatterns = [
    path('', views.UserFollowListView.as_view(), name='userfollow-list'),
    path('<int:pk>', views.UserFollowDetailView.as_view(), name='userfollow-detail'),
]