from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
import jwt

class GoogleAuthView(APIView):
    def post(self, request):
        id_token = request.data.get('id_token')

        try:
            CLIENT_ID = "632832146913-kj0cd29v9j9a16fn39mb9ioirfq5438r.apps.googleusercontent.com"

            decoded = jwt.decode(id_token, options={"verify_signature": False})

            if decoded['aud'] != CLIENT_ID:
                return Response({'error': 'Invalid client ID'}, status=401)

            user, created = User.objects.get_or_create(username=decoded.get('email'))
            if created:
                user.email = decoded.get('email')
                user.save()

            return Response({'message': 'User authenticated successfully'})

        except (jwt.InvalidTokenError, ValueError) as e:
            return Response({'error': 'Authentication failed'}, status=401)
