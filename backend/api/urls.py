from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . views import Endpoints
from . views import MyTokenObtainPairView
from . views import DocumentView

from authentication . views import RegisterView

urlpatterns = [
    path('', Endpoints.as_view(), name='test_view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('documents/', DocumentView.as_view()),
    path('register/', RegisterView.as_view())
]
