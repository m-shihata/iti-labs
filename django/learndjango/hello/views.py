from django.shortcuts import render


def hello(request, name):
    return render(request, 'hello/index.html', {
        "name":name
    })
