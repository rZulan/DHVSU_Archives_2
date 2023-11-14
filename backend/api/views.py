from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from . serializers import MyTokenObtainPairSerializer, SubmitDocumentSerializer
from library.serializers import DocumentSerializer
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
            max_similarity = 0

            for section in all_sections:
                if section.content:
                    similarity = self.calculate_similarity(content, section.content)
                    max_similarity = max(max_similarity, similarity)

            return Response({'max_similarity_score': max_similarity})
        else:
            return Response({'error': 'No content provided'})

    def calculate_similarity(self, content1, content2):
        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform([content1, content2])

        if tfidf_matrix.shape[0] > 0 and tfidf_matrix.shape[1] > 0:
            similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
            return similarity[0][0]
        else:
            return 0

class SubmitDocumentView(APIView):
    def post(self, request):
        serializer = SubmitDocumentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('Serializer errors:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
