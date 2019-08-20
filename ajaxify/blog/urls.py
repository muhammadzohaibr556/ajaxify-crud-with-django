from django.urls import path
from .views import *
app_name = 'blog'
urlpatterns = [
    path('',index,name='index'),
    path('save/',save,name='save'),
    path('delete/<int:pk>/',delete,name='delete'),
    path('update/<int:pk>/',update,name='udpate'),
    path('listv/',listv,name='listv'),
]
