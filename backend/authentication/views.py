from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from . models import CustomUser
from . serializers import CustomUserSerializer
from . serializers import GetUserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)  # Pass request data to serializer

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

class GetUser(APIView):
    def get(self, request, pk):
        try:
            user = CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GetUserSerializer(instance=user)
        return Response(serializer.data)