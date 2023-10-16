from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'first_name', 'last_name', 'birth_date', 'country']  # Add the fields you want to display
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('birth_date', 'country', 'bio', 'profile_picture'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
