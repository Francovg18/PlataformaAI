import { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function useChat() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingInterval, setTypingInterval] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    
    // Agregar mensaje del usuario
    setHistory(prev => [...prev, { sender: 'user', text: message }]);
    
    // Agregar placeholder de respuesta
    setHistory(prev => [...prev, { sender: 'bot', text: '⏳ Escribiendo...' }]);
    
    try {
      const response = await axios.post('http://localhost:8000/api/chat/', { message });
      const botResponse = response.data.response;
      
      // Limpiar intervalo anterior si existe
      if (typingInterval) {
        clearInterval(typingInterval);
      }
      
      // Efecto máquina de escribir
      let i = 0;
      const fullText = botResponse;
      const newInterval = setInterval(() => {
        if (i <= fullText.length) {
          setHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text = fullText.substring(0, i);
            return newHistory;
          });
          i++;
        } else {
          clearInterval(newInterval);
          setLoading(false);
        }
      }, 20); // Velocidad de escritura (ms por caracter)
      
      setTypingInterval(newInterval);
      
    } catch (error) {
      clearInterval(typingInterval);
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].text = 
          `Error: ${error.response?.data || 'No se pudo obtener respuesta'}`;
        return newHistory;
      });
      setLoading(false);
    }
  };

  const setTypingResponse = (text) => {
    setHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[newHistory.length - 1]?.sender === 'bot') {
        newHistory[newHistory.length - 1].text = text;
      }
      return newHistory;
    });
  };

  return { history, loading, sendMessage, setTypingResponse };
}