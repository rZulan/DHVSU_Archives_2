from rest_framework import serializers
from . models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'  # Include other fields you want to expose
