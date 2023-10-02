from django.urls import path
from . import views

urlpatterns = [
    path('responses/', views.ResponseListView.as_view(), name='response-list'),
    path('responses/<int:pk>/', views.ResponseDetailView.as_view(), name='response-detail'),
]