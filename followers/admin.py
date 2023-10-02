from django.contrib import admin
from .models import UserFollow

@admin.register(UserFollow)
class UserFollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'following')
