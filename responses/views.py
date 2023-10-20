from rest_framework import generics, permissions
from .models import Response, Question
from .serializers import ResponseSerializer

class ResponseListView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        question_id = self.request.query_params.get('question', None)
        queryset = Response.objects.all()

        if question_id is not None:
            queryset = queryset.filter(question=question_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ResponsesByQuestionView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        question_id = self.kwargs['question_id']
        return Response.objects.filter(question_id=question_id)

    def perform_create(self, serializer):
        question_id = self.kwargs['question_id']
        question = Question.objects.get(pk=question_id)

        serializer.save(user=self.request.user, question=question)

class UserResponsesListView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Response.objects.filter(user=user_id)

class ResponseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [permissions.IsAuthenticated]
