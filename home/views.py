from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def mainView(request):
    return HttpResponse(loader.get_template('home/test.html').render(None, request))
