from django.shortcuts import render
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404, HttpResponseBadRequest

# Create your views here.
from django.core.checks.messages import Error
from django.shortcuts import redirect, render
from .models import Todo

def index(request):
    if request.method == "GET":
        error = False
        try:
            # get all todos from database
            todos = Todo.objects.all()

        except Exception as e:
            print(e)
            error = True
        finally:
            # if everything ok list all todos
            if not error:
                return render(request, 'todo2/index.html', {
                    "todos": todos
                })
   

def todo_details(request, id):
    if request.method == "GET":
        error = False
        try:
            # get all todos from database
            todo = Todo.objects.get(pk=id)

        except ObjectDoesNotExist:
            return HttpResponseBadRequest

        except Exception as e:
            print(e)
            error = True

        finally:
            # if everything ok show todo details
            if not error:
                return render(request, 'todo2/todo_details.html', {
                    "todo": todo
                })


def create_todo(request):
    # Submitting creation form
    if request.method == "POST":
        # get the form data
        title = request.POST.get('title', None)
        desc = request.POST.get('desc', None)
        completed = request.POST.get('completed', False)
        priority = request.POST.get('priority', None)
        # set an error flag
        error = False

        try:
            # sanitize the data
            completed = True if completed == 'on' else False
            if priority:
                priority = int(priority)
            # create the todo and save it
            todo = Todo(title=title, desc=desc, completed=completed, priority=priority)
            todo.save()
        except Exception as e:
            print(e)
            error = True
        finally:
            if not error:
                # falsh the user with a success message
                messages.success(request,'Task created successfully!')
                return redirect('todo2:index')
            else:
                # falsh the user with error message and keep the user inputs for a better UX
                messages.error(request, 'Failed to create the task. please, try again later!')
                return render(request, 'todo2/create_todo.html', {
                    "title": title,
                    "desc": desc,
                    "completed": completed,
                    "priority": priority    
                })

    # Retrieving the creation form 
    if request.method == "GET":
        return render(request, 'todo2/create_todo.html')
            
        
def update_todo(request, id):
    if request.method == "POST":
        # get the form data
        title = request.POST.get('title', None)
        desc = request.POST.get('desc', None)
        completed = request.POST.get('completed', False)
        priority = request.POST.get('priority', None)
        # set an error flag
        error = False
        try:
            # sanitize the data
            if completed == 'on': completed = True 
            if priority: priority = int(priority)
            
            # get the todo to edit
            todo = Todo.objects.get(pk=id)

            # edit provided data
            if title: todo.title = title
            if desc: todo.desc = desc    
            todo.completed = completed
            todo.save()

        except Exception as e:
            print(e)
            error = True
        
        finally:
            if not error:
                messages.success(request, 'Task edited successfully!')
                return redirect('todo2:todo_details', id)
            else:
                messages.error(request, 'Failed to update the task! please try again later.')
                return render(request, 'todo2/update_todo.html', {
                    "id": id,
                    "title": title,
                    "desc": desc,
                    "completed": completed,
                    "priority": priority 
                })

    if request.method == "GET":
        todo = Todo.objects.get(pk=id)
        return render(request, 'todo2/update_todo.html', {
                "id": todo.id,
                "title": todo.title,
                "desc": todo.desc,
                "completed": todo.completed,
                "priority": todo.priority    
            })


def delete_todo(request, id):
    if request.method == 'GET':
        error = False
        try:
            todo = Todo.objects.get(pk=id)
            todo.delete()

        except ObjectDoesNotExist:
            return HttpResponseBadRequest

        except Exception as e:
            print(e)
            error = True
            messages.error(request, 'Failed to delete the task.')
        
        finally:
            if not error:
                messages.success(request, 'Task deleted successfully')
        
        return redirect('todo2:index')