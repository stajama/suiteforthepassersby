from django.db import models

# Create your models here.
class Tester(models.Model):
    id_number = models.IntegerField(default=0)

class ActionLog(models.Model):
    test_id = models.IntegerField(default=666)
    geoX = models.FloatField('Geocode Latitude')
    geoY = models.FloatField('Geocode Longitude')
    action = models.SlugField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)
