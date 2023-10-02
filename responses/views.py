from rest_framework import generics
from .models import Response
from .serializers import ResponseSerializer

class ResponseListView(generics.ListAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

class ResponseDetailView(generics.RetrieveAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer