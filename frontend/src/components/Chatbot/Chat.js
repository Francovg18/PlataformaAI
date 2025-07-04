import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useChat } from '../../features/useChat';
import '../../App.css';

const suggestions = [
  "¿Qué carrera debería estudiar si me gusta la tecnología?",
  "¿Qué opciones tengo si me gustan las artes y la creatividad?",
  "Me interesan los negocios, ¿qué carrera me recomiendas?",
  "¿Qué estudiar si me gusta ayudar a los demás?",
  "No estoy seguro de lo que me gusta, ¿puedes hacerme un test vocacional?"
];

export default function Chat() {
  const [input, setInput] = useState('');
  const [isTypingSuggestion, setIsTypingSuggestion] = useState(false);
  const { history, loading, sendMessage, setTypingResponse } = useChat();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== '' && !loading) {
      await sendMessage(input);
      setInput('');
    }
  };

  const handleSuggestionClick = async (text) => {
    if (loading || isTypingSuggestion) return;
    
    setIsTypingSuggestion(true);
    await sendMessage(text);
    setIsTypingSuggestion(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chat de Orientación Vocacional</h2>

      <div
        className="border rounded p-3 mb-3 bg-white"
        style={{ height: 400, overflowY: 'auto' }}
        ref={containerRef}
      >
        {history.filter(msg => msg && msg.text && msg.sender).map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}
          >
            {msg.sender === 'bot' ? (
              <div
                className="p-2 rounded bg-light"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked.parse(msg.text || ''))
                }}
              />
            ) : (
              <span className="badge bg-primary p-2">{msg.text}</span>
            )}
          </div>
        ))}

        {!loading && !isTypingSuggestion && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {suggestions.map((text, idx) => (
              <div
                key={idx}
                className="suggestion-bubble"
                onClick={() => handleSuggestionClick(text)}
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          disabled={loading || isTypingSuggestion}
        />
        <button className="btn btn-success" type="submit" disabled={loading || isTypingSuggestion}>
          {loading ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}