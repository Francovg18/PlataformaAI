import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AIMARA_ALPHABET = [
  'a', 'ch', "ch'", 'chh', 'i', 'j', 'k', "k'", 'kh',
  'l', 'll', 'm', 'n', 'ñ', 'p', "p'", 'ph', 'q', "q'",
  'qh', 'r', 's', 't', "t'", 'th', 'u', 'w', 'x', 'y'
];

function AimaraGame() {
  const [board, setBoard] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const newBoard = AIMARA_ALPHABET.map(letter => {
      const isEmpty = Math.random() < 0.3;
      return {
        correct: letter,
        value: isEmpty ? '' : letter,
        isEmpty,
        isCorrect: false,
        isValidated: false
      };
    });

    const missing = newBoard
      .filter(cell => cell.isEmpty)
      .map(cell => cell.correct)
      .sort(() => 0.5 - Math.random());

    setBoard(newBoard);
    setAvailableLetters(missing);
  }, []);

  const showSuccessAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#4caf50',
      confirmButtonText: 'Continuar'
    });
  };

  const showErrorAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Entendido'
    });
  };

  const showWarningAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonColor: '#ff9800',
      confirmButtonText: 'Entendido'
    });
  };

  const showInfoAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonColor: '#2196f3',
      confirmButtonText: 'Continuar'
    });
  };

  const handleCellClick = (index) => {
    if (gameOver) return;

    const updatedBoard = [...board];

    if (!selectedLetter && updatedBoard[index].value) {
      // Devolver al banco
      setAvailableLetters([...availableLetters, updatedBoard[index].value]);
      updatedBoard[index].value = '';
      setBoard(updatedBoard);
      return;
    }

    if (selectedLetter && updatedBoard[index].isEmpty && updatedBoard[index].value === '') {
      updatedBoard[index].value = selectedLetter;
      setBoard(updatedBoard);
      setAvailableLetters(availableLetters.filter(l => l !== selectedLetter));
      setSelectedLetter(null);
    }
  };

  const handleLetterClick = (letter) => {
    if (gameOver) return;
    setSelectedLetter(letter);
  };

  const handleSubmit = () => {
    if (gameOver) return;

    const newBoard = [...board];
    let allCorrect = true;
    let markedOneCorrect = false;

    // Primera verificación: ¿Está todo correcto?
    newBoard.forEach(cell => {
      if (cell.isEmpty) {
        const userInput = cell.value.trim().toLowerCase();
        const expected = cell.correct.toLowerCase();
        if (userInput !== expected) allCorrect = false;
      }
    });

    // Si todo está correcto, terminar el juego
    if (allCorrect) {
      newBoard.forEach(cell => {
        if (cell.isEmpty) {
          cell.isCorrect = true;
          cell.isValidated = true;
        }
      });
      setBoard(newBoard);
      setGameOver(true);
      
      showSuccessAlert(
        '¡Felicidades!', 
        'Completaste correctamente todo el alfabeto Aimara.'
      );
      return;
    }

    // Si no está todo correcto, proceder con la lógica de marcar una correcta
    if (attempts < 4) {
      // Marcamos solo UNA correcta (antes del 5to intento)
      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (cell.isEmpty && !cell.isValidated) {
          const userInput = cell.value.trim().toLowerCase();
          const expected = cell.correct.toLowerCase();
          
          if (userInput === expected) {
            cell.isCorrect = true;
            cell.isValidated = true;
            markedOneCorrect = true;
            break; // Solo marcamos una
          }
        }
      }
      
      setBoard(newBoard);
      setAttempts(prev => prev + 1);
      
      if (markedOneCorrect) {
        showSuccessAlert(
          '¡Correcto!', 
          'Has acertado. Continúa completando el resto.'
        );
      } else {
        showWarningAlert(
          'Intenta de nuevo', 
          'No has acertado ninguna letra nueva. Revisa tus respuestas.'
        );
      }
    } else if (attempts === 4) {
      // 5to intento: marcar todas las incorrectas
      newBoard.forEach(cell => {
        if (cell.isEmpty && !cell.isValidated) {
          const userInput = cell.value.trim().toLowerCase();
          const expected = cell.correct.toLowerCase();
          cell.isCorrect = userInput === expected;
          cell.isValidated = true;
        }
      });
      
      setBoard(newBoard);
      setAttempts(prev => prev + 1);
      
      showInfoAlert(
        'Última oportunidad', 
        'Se han marcado tus errores. Tienes una última oportunidad para corregirlos.'
      );
    } else {
      // 6to intento (última oportunidad después de marcar errores)
      newBoard.forEach(cell => {
        if (cell.isEmpty) {
          const userInput = cell.value.trim().toLowerCase();
          const expected = cell.correct.toLowerCase();
          cell.isCorrect = userInput === expected;
          cell.isValidated = true;
          if (!cell.isCorrect) allCorrect = false;
        }
      });
      
      setBoard(newBoard);
      setGameOver(true);
      
      if (allCorrect) {
        showSuccessAlert(
          '¡Perfecto!', 
          'Corregiste todos los errores en tu última oportunidad.'
        );
      } else {
        showErrorAlert(
          'Juego terminado', 
          'Algunas letras siguen incorrectas. ¡Puedes intentarlo de nuevo!'
        );
      }
    }
  };

  const getCellStyle = (cell) => {
    if (!cell.isValidated) return {};
    if (cell.isCorrect) 
      return { 
        backgroundColor: '#4caf50',
        color: 'white',
        boxShadow: '0 0 10px 3px #4caf50',
        borderColor: '#388e3c',
        fontWeight: 'bold',
      };
    if (!cell.isCorrect && attempts >= 5) 
      return { 
        backgroundColor: '#f44336',
        color: 'white',
        boxShadow: '0 0 10px 3px #f44336',
        borderColor: '#b71c1c',
        fontWeight: 'bold',
      };
    return {};
  };

  const startGame = () => {
    setShowBanner(false);
  };

  const resetGame = () => {
    setShowBanner(true);
    setGameOver(false);
    setAttempts(0);
    setSelectedLetter(null);
    // Reiniciar el tablero
    const newBoard = AIMARA_ALPHABET.map(letter => {
      const isEmpty = Math.random() < 0.3;
      return {
        correct: letter,
        value: isEmpty ? '' : letter,
        isEmpty,
        isCorrect: false,
        isValidated: false
      };
    });

    const missing = newBoard
      .filter(cell => cell.isEmpty)
      .map(cell => cell.correct)
      .sort(() => 0.5 - Math.random());

    setBoard(newBoard);
    setAvailableLetters(missing);
  };

if (showBanner) {
    return (
      <div style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '4px solid #f8d56b',
          maxWidth: '600px',
          width: '100%',
          margin: '20px'
        }}>
          {/* Contenido del banner se mantiene igual */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              animation: 'bounce 2s infinite',
              position: 'relative'
            }}>
              <span style={{ fontSize: '40px' }}>🧩</span>
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                animation: 'spin 4s linear infinite'
              }}>
                <span style={{ fontSize: '24px' }}>✨</span>
              </div>
            </div>
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            🌟 Alfabeto Aimara 🌟
          </h1>
          
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#e67e22',
            marginBottom: '16px'
          }}>
            en la Aventura Lingüística
          </h2>
          
          <p style={{
            color: '#555',
            fontSize: '18px',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            ¡Ayuda a completar el alfabeto aimara descubriendo las letras que faltan!
          </p>
          
          <p style={{
            fontSize: '14px',
            color: '#4b6cb7',
            marginBottom: '24px'
          }}>
            💡 Selecciona las letras disponibles y colócalas en los espacios vacíos
          </p>
          
          <button 
            onClick={startGame}
            style={{
              background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
              color: 'white',
              fontWeight: 'bold',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(75, 108, 183, 0.4)',
              animation: 'pulse 2s infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(75, 108, 183, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(75, 108, 183, 0.4)';
            }}
          >
            🚀 ¡Comenzar Aventura! 🚀
          </button>
        </div>
        
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }


  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 20, maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ color: '#333', marginBottom: 15, textAlign: 'center' }}>Completa el alfabeto Aimara</h2>

      <div style={{ 
        display: 'flex', flexWrap: 'wrap', maxWidth: 600, margin: '0 auto', 
        justifyContent: 'center', gap: 10,
        padding: 10,
        border: '2px solid #ccc', 
        borderRadius: 12,
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => cell.isEmpty && handleCellClick(idx)}
            style={{
              margin: 5,
              width: 52,
              height: 48,
              lineHeight: '48px',
              border: '2px solid #777',
              borderRadius: 8,
              textAlign: 'center',
              cursor: gameOver ? 'default' : (cell.isEmpty ? 'pointer' : 'default'),
              backgroundColor: cell.isEmpty ? '#e0e0e0' : '#dcedc8',
              fontWeight: '600',
              fontSize: 20,
              userSelect: 'none',
              transition: 'all 0.3s ease',
              ...getCellStyle(cell),
            }}
            title={cell.isEmpty && !gameOver ? 'Haz click para colocar o quitar letra' : ''}
          >
            {cell.value}
          </div>
        ))}
      </div>

      {!gameOver && (
        <>
          <h3 style={{ marginTop: 30, color: '#555', textAlign: 'center' }}>Letras disponibles</h3>
          <div style={{ 
            display: 'flex', flexWrap: 'wrap', maxWidth: 600, margin: '0 auto', 
            justifyContent: 'center', gap: 12,
            padding: 10,
            border: '2px solid #333',
            borderRadius: 12,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {availableLetters.map((letter, idx) => (
              <div
                key={idx}
                onClick={() => handleLetterClick(letter)}
                style={{
                  margin: 5,
                  padding: '12px 20px',
                  border: '3px solid #444',
                  borderRadius: 12,
                  cursor: 'pointer',
                  backgroundColor: selectedLetter === letter ? '#90caf9' : '#fff',
                  color: selectedLetter === letter ? '#0d47a1' : '#222',
                  fontWeight: '600',
                  fontSize: 18,
                  userSelect: 'none',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  boxShadow: selectedLetter === letter ? '0 0 10px #90caf9' : 'none'
                }}
                title="Haz click para seleccionar esta letra"
              >
                {letter}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button 
              onClick={handleSubmit} 
              style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                fontSize: 18,
                borderRadius: 12,
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.4)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              Validar respuestas
            </button>
            <p style={{ marginTop: 12, fontWeight: '600', fontSize: 16, color: '#555' }}>
              Intentos: {attempts} / 5
            </p>
          </div>
        </>
      )}

      {gameOver && (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <h3 style={{ color: '#388e3c', marginBottom: 20 }}>
            🎉 ¡Juego terminado! Gracias por jugar.
          </h3>
          <button 
            onClick={resetGame}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: 16,
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#43a047';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4caf50';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🔄 Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}

export default AimaraGame;