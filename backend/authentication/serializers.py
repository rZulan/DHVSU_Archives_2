from rest_framework import serializers
from . models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        if not email.endswith('@dhvsu.edu.ph'):
            raise serializers.ValidationError('Please use a valid email ending with @dhvsu.edu.ph')
        
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if(password is not None):
            instance.set_password(password)
            instance.save()
            return instance

class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email']