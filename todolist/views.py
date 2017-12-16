# coding=utf-8
from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, 'index.html')


def login_page(request):
    return render(request, 'login.html',
                  context={"register": request.GET['register'] if 'register' in request.GET else 'false'})
