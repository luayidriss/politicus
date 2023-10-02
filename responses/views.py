from rest_framework import generics
from .models import Response
from .serializers import ResponseSerializer

class ResponseListView(generics.ListCreateAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class ResponseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer