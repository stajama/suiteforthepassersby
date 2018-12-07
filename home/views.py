from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.template import loader
from . import models

import bleach

# Create your views here.
# def mainView(request):
#     return HttpResponse(loader.get_template('home/Playing.html').render(None, request))

def landing(request):
    return HttpResponse(loader.get_template('home/main.html').render(None, request))

# def getID(request):
#     print("pre: " + str(models.Tester.objects.all()))
#     tester = models.Tester(len(models.Tester.objects.all()))
#     tester.save()
#     print("post: " + str(models.Tester.objects.all()))
#     id_number = tester.id
#     return(JsonResponse({'id':id_number}))

# def log(request, id, geoX, geoY, action):
#     geoX = float(geoX)
#     geoY = float(geoY)
#     addDataPoint = models.ActionLog(test_id=id, geoX=geoX, geoY=geoY, action=cleanUp(action))
#     addDataPoint.save()
#     print(str(addDataPoint))
#     return(JsonResponse({'exit_code': 1}))

# def cleanUp(string1):
#     outString = ''
#     for i in string1:
#         if i == '_':
#             outString += ' '
#         else:
#             outString += i
#     return bleach.clean(outString)
