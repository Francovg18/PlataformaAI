from django.urls import path
from .views import root, chat_with_bot

urlpatterns = [
    path('', root),
    path('chat/', chat_with_bot),
]
