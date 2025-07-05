from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random

aimara_alphabet = ['a', 'ch', 'e', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'z']

@api_view(['GET'])
def get_board(request):
    # Configuramos tamaño del tablero
    rows = 4
    cols = 5
    total_cells = rows * cols
    
    # Aseguramos que el alfabeto tenga suficientes letras
    letters = aimara_alphabet[:total_cells]
    
    # Decidimos aleatoriamente qué posiciones estarán vacías (por ejemplo 5 espacios vacíos)
    num_empty = 5
    empty_positions = random.sample(range(total_cells), num_empty)
    
    board = []
    for i in range(total_cells):
        if i in empty_positions:
            board.append({'letter': '', 'correct_letter': letters[i], 'is_empty': True})
        else:
            board.append({'letter': letters[i], 'correct_letter': letters[i], 'is_empty': False})
    
    # Convertimos la lista plana a matriz para enviar mejor al frontend
    matrix = [board[i*cols:(i+1)*cols] for i in range(rows)]
    
    return Response({'board': matrix})

@api_view(['POST'])
def validate_board(request):
    # El frontend envía la matriz con las letras que completó el usuario
    user_board = request.data.get('board')  # debe tener la misma estructura que la enviada antes
    
    # Validar cada letra vacía si corresponde con la letra correcta
    correct = True
    for row in user_board:
        for cell in row:
            if cell['is_empty']:
                if cell['letter'].lower() != cell['correct_letter'].lower():
                    correct = False
                    break
    
    return Response({'correct': correct})

