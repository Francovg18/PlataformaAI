from django.urls import path
from django.http import HttpResponse
from . import views

urlpatterns = [
    # puedes agregar más rutas específicas aquí
    path('board/', views.get_board, name='get_board'),
    path('validate/', views.validate_board, name='validate_board'),
]
def index(request):
    return HttpResponse("API Aimara Game v2 funcionando")