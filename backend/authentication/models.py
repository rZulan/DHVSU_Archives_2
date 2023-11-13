from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    # Add any additional fields you need for your user
    # For example:
    bio = models.TextField(blank=True)