from django.urls import path

from . views import Endpoints

urlpatterns = [
    path('', Endpoints.as_view(), name='test_view')
]
