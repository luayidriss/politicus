from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer
from django.db.models import Q

class QuestionListView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        keyword = self.request.query_params.get('q', None)
        queryset = Question.objects.all()
        if keyword:
            queryset = queryset.filter(Q(question__icontains=keyword) | Q(description__icontains=keyword))
        return queryset

class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class UserQuestionsListView(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Question.objects.filter(user=user_id)

