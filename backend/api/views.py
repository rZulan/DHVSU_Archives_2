from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from . serializers import MyTokenObtainPairSerializer
from library.serializers import DocumentSerializer
from library.models import Document

        
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class Endpoints(APIView):
    def get(self, request):
        data = {
            'endpoints': {
                'token': 'token/',
                'refresh': 'token/refresh/',
            }
        }
        return Response(data, status=status.HTTP_200_OK)

class DocumentView(APIView):
    def get(self, request):
        data = Document.objects.all()
        serializer = DocumentSerializer(data, many=True)
        return Response(serializer.data)