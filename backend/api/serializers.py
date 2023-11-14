from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from library.models import Document, DocumentSection

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['username'] = user.username

        return token
    
# serializers.py

class DocumentSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentSection
        fields = ['section', 'content']

class SubmitDocumentSerializer(serializers.ModelSerializer):
    sections = DocumentSectionSerializer(many=True)
    file = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = Document
        fields = ['title', 'abstract', 'sections', 'file']

    def create(self, validated_data):
        sections_data = validated_data.pop('sections')
        document = Document.objects.create(**validated_data)

        for section_data in sections_data:
            DocumentSection.objects.create(document=document, **section_data)

        return document
