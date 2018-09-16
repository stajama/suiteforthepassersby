from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from . import models

# Create your views here.
def mainView(request):
    return HttpResponse(loader.get_template('home/test.html').render(None, request))

def getID(request):
    print("pre: " + str(models.Tester.objects.all()))
    tester = models.Tester(len(models.Tester.objects.all()))
    tester.save()
    print("post: " + str(models.Tester.objects.all()))
    id_number = tester.id
    return(HttpResponse(id_number))

def log(request, id, geoX, geoY, action):
    geoX = float(geoX)
    geoY = float(geoY)
    addDataPoint = models.ActionLog(test_id=id, geoX=geoX, geoY=geoY, action=action)
    addDataPoint.save()
    print(str(addDataPoint))
    return(HttpResponse(1))
