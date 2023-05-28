from re import M
from django.urls import path, include
from .views import *

urlpatterns = [
    path('api/list/', list_product, name="basic_info_detail"),
]