from django.shortcuts import render,HttpResponse, redirect
from .models import BlogPost
from django.http import JsonResponse
import json
# Create your views here.
def index(request):

    return render(request,'blog/index.html')

def save(request):
    if request.method=='POST' and request.is_ajax():
        title = request.POST.get('title')
        description = request.POST.get('description')
        response_data ={}
        post = BlogPost(title=title, description=description)
        post.save()

        response_data['result']= 'Created Post Successfully'
        response_data['postpk']=post.pk
        response_data['title']=post.title
        response_data['desc']=post.description
        return JsonResponse(response_data)
            #json.dumps(response_data),
            #content_type = 'application/json'
        #)
    else:
         return HttpResponse("NOthing to see:")
            #json.dumps("NOthing to see:"),
            #content_type = 'application/json'
        #)
    
def delete(request, pk):
    if request.method=='POST' and request.is_ajax():
        response_data =''
        post = BlogPost.objects.get(id=pk)
        post.delete()

        response_data= 'Post Deleted Successfully'
        return HttpResponse(response_data)
    else:
        return HttpResponse("Nothing to see:")

def listv(request):
    if request.method=='GET' and request.is_ajax():
        post=list(BlogPost.objects.all().values())
        data = dict()
        data['posts'] = post
        return JsonResponse(data)
        #return JsonResponse("Here's to see:")
    else:
        return HttpResponse("Nothing to see:")

def update(request, pk):
    if request.method=='POST' and request.is_ajax():
        response_data =''
        post = BlogPost.objects.get(id=pk)
        post.title=request.POST.get('title')
        post.description=request.POST.get('desc')
        post.save()

        response_data= 'Post Updated Successfully'
        return HttpResponse(response_data)
    else:
        return HttpResponse("Nothing to see:")