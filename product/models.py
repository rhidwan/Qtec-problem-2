from django.db import models
from django_resized import ResizedImageField

# Create your models here.

class Brand(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    address = models.TextField()

    def __str__(self):
        return self.name

class Seller(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    address = models.TextField()
    
    def __str__(self):
        return self.name
    
class Product(models.Model):

    EARPHONE_TYPE_CHOICE = (("TWS", "TWS"), ("NECKBAND", "NECKBAND"), ("WIRED", "WIRED"))
    title = models.CharField(max_length=200, null=False, blank=False)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True, blank=True)
    warranty = models.CharField(max_length=100, blank=True, null=True)
    price = models.FloatField()
    category = models.CharField(choices=EARPHONE_TYPE_CHOICE, max_length=30)
    photo = ResizedImageField(size=[300,300], upload_to="pictures/")

    def __str__(self):
        return self.title