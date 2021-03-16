from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm


def register(request):
    form = UserCreationForm(request.POST or None)
    
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')  
        password = form.cleaned_data.get('password1')
        print(username, password)
        user = authenticate(username=username, password=password)
        print(user)
        if user:
            if not user.is_active:
                # we need to do email verification later
                login(request, user)
                return redirect('netflix:retrieve_movies')
            else:
                pass

    return render(request, 'registration/register.html', {
        'form': form
    })


