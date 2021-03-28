from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import Group


def register(request):
    form = UserCreationForm(request.POST or None)
    
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')  
        password = form.cleaned_data.get('password1')
        print(username, password)
        user = authenticate(username=username, password=password)
        # for now all of our users are premium and only thing they can do is to view and watch movies
        premium_users_group = Group.objects.get(name='premium_users')
        user.groups.add(premium_users_group)
        if user:
            if user.is_active:
                # we need to do email verification later
                login(request, user)
                return redirect('netflix:retrieve_movies')
            else:
                pass

    return render(request, 'registration/register.html', {
        'form': form
    })


