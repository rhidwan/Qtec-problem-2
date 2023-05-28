from django.shortcuts import render
from cProfile import Profile
from collections import namedtuple
from urllib import response
from django.db import IntegrityError
from django.urls import reverse
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser, MultiPartParser, FileUploadParser

from .serializers import ProductSerializer

from .models import Product


# Create your views here.

@api_view(["GET"])
def list_product(request):
    if request.method == "GET":
        products = Product.objects.all().prefetch_related('brand', 'seller')
        warranty = set()
        brands = set()
        sellers = set()
        for product in products:
            warranty.add(product.warranty)
            brands.add(product.brand.name)
            sellers.add(product.seller.name)
        
        filters = {
            "warranty": list(warranty),
            "brands": list(brands),
            "sellers": list(sellers)
        }
        
        product_serializer = ProductSerializer(products, many=True)

        data = {
            "filters": filters,
            "products": product_serializer.data
        }
        return JsonResponse(data, safe=False ) 
