import jwt
import requests
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def authenticate_user(request):
    id_token = request.POST.get('id_token')  # Assuming the ID token is sent via POST request

    try:
        # Specify your Google Client ID
        CLIENT_ID = "632832146913-kj0cd29v9j9a16fn39mb9ioirfq5438r.apps.googleusercontent.com"  # Replace with your actual Google Client ID

        # Verify and decode the ID token
        decoded = jwt.decode(id_token, options={"verify_signature": False})

        if decoded['aud'] != CLIENT_ID:
            return JsonResponse({'error': 'Invalid client ID'}, status=401)

        # Fetch necessary user data or create a user if it doesn't exist
        user, created = User.objects.get_or_create(username=decoded.get('email'))
        if created:
            # Additional user profile data can be updated here
            user.email = decoded.get('email')
            user.save()

        # Return a success response or user data
        return JsonResponse({'message': 'User authenticated successfully'})

    except (jwt.InvalidTokenError, ValueError) as e:
        return JsonResponse({'error': 'Authentication failed'}, status=401)
