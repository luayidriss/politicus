from django.urls import path
from . import views

urlpatterns = [
    path('followers/<int:user_id>/', views.UserFollowersListView.as_view(), name='followers-list'),
    path('following/<int:user_id>/', views.UserFollowingListView.as_view(), name='following-list'),
    path('follow/<int:user_id>/', views.toggle_follow, name='toggle-follow'),
]
