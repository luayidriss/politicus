from rest_framework import generics
from .models import Response
from .serializers import ResponseSerializer

class ResponseListView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        question_id = self.request.query_params.get('question', None)
        queryset = Response.objects.all()

        if question_id is not None:
            queryset = queryset.filter(question=question_id)

        return queryset

class ResponseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class ResponsesByQuestionView(generics.ListCreateAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        question_id = self.kwargs['question_id']
        return Response.objects.filter(question_id=question_id)