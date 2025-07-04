# api/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import google.generativeai as genai
import os
import re
import math
from django.http import JsonResponse

# Configurar Gemini igual que antes
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY no está configurada en las variables de entorno")

genai.configure(api_key=GOOGLE_API_KEY)

def get_available_gemini_model():
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                if m.name in ['models/gemini-pro', 'models/gemini-1.5-flash']:
                    return genai.GenerativeModel(m.name)
        return None
    except Exception as e:
        print(f"Error al obtener modelo Gemini: {e}")
        return None

model = get_available_gemini_model()

@api_view(['GET'])
@permission_classes([AllowAny])
def root(request):
    return Response({"message": "API de orientación vocacional activa"})

@api_view(['POST'])
@permission_classes([AllowAny])
def chat_with_bot(request):
    message = request.data.get('message', '')
    response_text = ""

    if model:
        try:
            prompt = (
                "Eres un orientador vocacional experto. Responde de forma clara y empática usando **formato Markdown** con:\n"
                "- Encabezados (##) para dividir temas\n"
                "- Listas para presentar opciones de carrera o pasos\n"
                "- Negritas para destacar puntos clave\n"
                "- Cursivas para comentarios personales o reflexivos\n\n"
                f"Pregunta del usuario: {message}\n\n"
                "Si el usuario no está seguro de qué estudiar, puedes hacerle preguntas para conocer sus intereses, "
                "habilidades y preferencias. Si menciona un área (como tecnología, salud, arte), sugiérele carreras relacionadas."
            )
            response_text = model.generate_content(prompt).text
        except Exception as e:
            response_text = f"**Error al usar Gemini:** {str(e)}"
    else:
        response_text = "No hay modelo Gemini disponible para procesar tu consulta."

    return Response({"response": response_text})
