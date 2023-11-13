from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
        
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