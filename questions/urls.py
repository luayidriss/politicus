# questions/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.QuestionListView.as_view(), name='question-list'),
    path('<int:pk>', views.QuestionDetailView.as_view(), name='question-detail'),
]
