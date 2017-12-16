import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse


def login_api(request):
    username = request.GET['username']
    password = request.GET['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return HttpResponse('true')
        else:
            return HttpResponse('disabled account')
    else:
        return HttpResponse('invalid login')


def register_api(request):
    username = request.GET['username']
    password = request.GET['password']
    email = request.GET['email']
    if User.objects.filter(username=username).__len__() > 0:
        return HttpResponse('username has existed')
    elif User.objects.filter(email=email).__len__() > 0:
        return HttpResponse('email has existed')
    User.objects.create_user(username, email, password)
    login(request, authenticate(username=username, password=password))
    return HttpResponse('true')


def validate_status_api(request):
    if request.user.is_authenticated():
        return HttpResponse('true')
    else:
        return HttpResponse('false')


def logout_api(request):
    logout(request)
    return HttpResponse('logged out')


@login_required()
def post_todo_api(request):
    body = request.POST
    timestamp = datetime.datetime.now() + datetime.timedelta(days=3)
    priority = 0
    if 'timestamp' in body:
        timestamp = datetime.datetime.fromtimestamp(int(body['timestamp']))
    if 'priority' in body:
        priority = int(body['priority'])
    request.user.todo_set.create(title=body['title'],
                                 description=body['description'],
                                 status=0,
                                 priority=priority,
                                 expiredDate=timestamp)
    return HttpResponse('true')


@login_required()
def change_todo_status_api(request):
    todo = request.user.todo_set.filter(id=int(request.GET['id']))
    if len(todo) == 0:
        return HttpResponse('id is not existed')
    todo[0].status = int(request.GET['status'])
    todo[0].save()
    return HttpResponse('true')


@login_required()
def del_todo_api(request):
    todo = request.user.todo_set.filter(id=int(request.GET['id']))
    todo.delete()
    return HttpResponse('true')


@login_required()
def edit_api(request):
    todo = request.user.todo_set.filter(id=int(request.POST['id']))
    if len(todo) == 0:
        return HttpResponse('id is not existed')
    if 'title' in request.POST:
        todo[0].title = request.POST['title']
    if 'description' in request.POST:
        todo[0].description = request.POST['description']
    todo[0].save()
    return HttpResponse('true')
