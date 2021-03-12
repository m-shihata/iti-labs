from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404

tasks = []


def index(request):
    if request.method == 'POST':
        tasks.append(request.POST['task'])
        return redirect('index')

    return render(request, 'todo/index.html', {
        'tasks': tasks
    })


def delete_todo(request, id):
    if request.method == 'GET':
        tasks.pop(id-1)
        return redirect('index')
