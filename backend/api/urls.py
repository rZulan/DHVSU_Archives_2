from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from backend import settings
from django.conf.urls.static import static

from . views import DocumentSectionAPIView, Endpoints, MyTokenObtainPairView, DocumentView, SubmitDocumentView
from authentication . views import RegisterView, GetUser

urlpatterns = [
    path('', Endpoints.as_view(), name='test_view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('documents/', DocumentView.as_view()),
    path('register/', RegisterView.as_view()),
    path('section/', DocumentSectionAPIView.as_view(), name='document-section-api'),
    path('submit/', SubmitDocumentView.as_view(), name='submit-document'),
    path('user/<int:pk>', GetUser.as_view(), name='get_user'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
