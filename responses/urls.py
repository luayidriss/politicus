from django.urls import path
from . import views

urlpatterns = [
    path('', views.ResponseListView.as_view(), name='response-list'),
    path('question/<int:question_id>/', views.ResponsesByQuestionView.as_view(), name='responses-by-question'),
    path('user/<int:user_id>/', views.UserResponsesListView.as_view(), name='user-responses-list'),
    path('<int:pk>/', views.ResponseDetailView.as_view(), name='response-detail'),

]