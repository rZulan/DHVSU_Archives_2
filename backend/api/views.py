from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from . serializers import MyTokenObtainPairSerializer
from library.serializers import DocumentSectionSerializer, DocumentSerializer
from library.models import Document, DocumentSection

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
        
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

class DocumentSectionAPIView(APIView):
    def post(self, request):
        content = request.data.get('content')

        if content:
            all_sections = DocumentSection.objects.all()
            max_similarity = 0  # Initializing with the lowest similarity

            for section in all_sections:
                similarity = self.calculate_similarity(content, section.content)
                max_similarity = max(max_similarity, similarity)

            return Response({'max_similarity_score': max_similarity})
        else:
            return Response({'error': 'No content provided'})

    def calculate_similarity(self, content1, content2):
        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform([content1, content2])
        similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
        return similarity[0][0]