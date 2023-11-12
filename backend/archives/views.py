from google.auth.transport import requests
from google.oauth2 import id_token
from django.contrib.auth.models import User

def authenticate_user(id_token):
    try:
        # Specify your Google Client ID
        CLIENT_ID = "your_client_id_here"  # Replace with your actual Google Client ID

        # Verifying the token using google-auth library
        idinfo = id_token.verify_oauth2_token(id_token, requests.Request(), CLIENT_ID)

        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # Fetch necessary user data or create a user if it doesn't exist
        user, created = User.objects.get_or_create(username=idinfo['email'])
        if created:
            # Additional user profile data can be updated here
            user.email = idinfo['email']
            user.save()

        return user
    except ValueError as e:
        print(str(e))  # Log the error or handle it as required
        return None
