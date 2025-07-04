import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons } from '../../redux/actions/lessonM';
import { createOrUpdateProgress } from '../../redux/actions/progress';
import { useParams } from 'react-router-dom';

const MathLessonModule = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { lessons } = useSelector(state => state.Lessons);
  const { progress } = useSelector(state => state.Progress || { progress: [] });

  const [lesson, setLesson] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [progressSaved, setProgressSaved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Estados para la pizarra
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#2563eb');
  const [currentSize, setCurrentSize] = useState(3);

  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  useEffect(() => {
    const selected = lessons.find(l => l.course === parseInt(id));
    if (selected) setLesson(selected);
  }, [lessons, id]);

  const currentExercise = lesson?.exercises?.[currentExerciseIndex];

  const handleSubmit = () => {
    if (!currentExercise || !userAnswer.trim()) return;

    setTotalAttempts(prev => prev + 1);

    const correct = userAnswer.trim() === currentExercise.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      setXp(prev => prev + lesson.xp_value);
      setTimeout(() => {
        setShowFeedback(false);
        setUserAnswer('');
        setCurrentExerciseIndex(prev => prev + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  };

  const handleChoiceClick = (opt) => {
    setTotalAttempts(prev => prev + 1);

    const correct = opt === currentExercise.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectAnswers(prev => prev + 1);
      setXp(prev => prev + lesson.xp_value);
      setTimeout(() => {
        setShowFeedback(false);
        setCurrentExerciseIndex(prev => prev + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  };

  const progressValue = lesson?.exercises?.length
    ? Math.round((currentExerciseIndex / lesson.exercises.length) * 100)
    : 0;

  useEffect(() => {
    if (lesson && currentExerciseIndex >= lesson.exercises.length && !progressSaved) {
      const now = new Date().toISOString();
      const accuracy = totalAttempts > 0 ? correctAnswers / totalAttempts : 0;

      dispatch(createOrUpdateProgress(lesson.id, {
        completed: true,
        earned_xp: xp,
        accuracy: accuracy,
        retries: totalAttempts,
        timestamp: now
      }));

      setProgressSaved(true);
    }
  }, [lesson, currentExerciseIndex, xp, totalAttempts, correctAnswers, progressSaved, dispatch]);

  // Funciones para la pizarra
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const coords = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const colors = ['#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', '#c2410c'];

  const StarIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const TrophyIcon = () => (
    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 8a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
    </svg>
  );

  const WhiteboardIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h16V5H4zm2 2h12v2H6V7zm0 3h8v2H6v-2z"/>
      <path d="M12 19l-2-2h4l-2 2z"/>
    </svg>
  );

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600 font-medium">Cargando tu aventura matemática...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute top-32 right-16 w-12 h-12 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-green-300 rounded-full opacity-80 animate-bounce delay-300"></div>
      <div className="absolute bottom-40 right-32 w-16 h-16 bg-orange-300 rounded-full opacity-50 animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {lesson.title}
          </h1>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center bg-yellow-400 rounded-full px-4 py-2 shadow-lg">
              <StarIcon />
              <span className="ml-2 font-bold text-yellow-900">{xp} XP</span>
            </div>
            <div className="flex items-center bg-red-400 rounded-full px-4 py-2 shadow-lg">
              <HeartIcon />
              <span className="ml-2 font-bold text-red-900">3</span>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Progreso</span>
            <span className="text-white font-bold">{currentExerciseIndex}/{lesson.exercises?.length || 0}</span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progressValue}%` }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {currentExercise ? (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-2">{lesson.instruction}</p>
                    <h2 className="text-2xl font-bold">{currentExercise.question_text}</h2>
                  </div>
                  <button
                    onClick={() => setShowWhiteboard(true)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-2xl transition-all duration-200 flex items-center space-x-2"
                    title="Abrir pizarra para calcular"
                  >
                    <WhiteboardIcon />
                    <span className="hidden md:inline text-sm font-medium">Pizarra</span>
                  </button>
                </div>
              </div>

              <div className="p-8">
                {currentExercise.answer_type === 'input' ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full text-2xl text-center py-4 px-6 border-4 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-300"
                        placeholder="Escribe tu respuesta..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!userAnswer.trim()}
                      className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-2xl text-xl transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
                    >
                      ¡Enviar Respuesta!
                    </button>
                  </div>
                ) : currentExercise.answer_type === 'multiple_choice' && currentExercise.options ? (
                  <div className="grid gap-4">
                    {currentExercise.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleChoiceClick(opt)}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-2 border-blue-200 hover:border-purple-300 text-xl font-semibold py-4 px-6 rounded-2xl transform hover:scale-105 active:scale-95 transition-all duration-200 text-gray-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">Tipo de pregunta no soportado</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-12 transform hover:scale-105 transition-transform duration-300">
                <div className="text-yellow-500 mb-6">
                  <TrophyIcon />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">¡Felicitaciones!</h2>
                <p className="text-xl text-gray-600 mb-6">Has completado toda la lección</p>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 inline-block">
                  <p className="text-2xl font-bold">Ganaste {xp} puntos XP</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de la Pizarra */}
      {showWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-screen overflow-auto">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 text-white rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">🎨 Pizarra Digital</h3>
                <button
                  onClick={() => setShowWhiteboard(false)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full"
                >
                  <XIcon />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Herramientas de la pizarra */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Colores:</span>
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setCurrentColor(color)}
                        className={`w-8 h-8 rounded-full border-4 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'} transition-all duration-200`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Grosor:</span>
                  <div className="flex space-x-2">
                    {[2, 4, 6, 8].map(size => (
                      <button
                        key={size}
                        onClick={() => setCurrentSize(size)}
                        className={`w-8 h-8 rounded-full ${currentSize === size ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} flex items-center justify-center font-bold text-sm transition-all duration-200`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={clearCanvas}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  🗑️ Borrar Todo
                </button>
              </div>

              {/* Canvas de la pizarra */}
              <div className="border-4 border-gray-300 rounded-2xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              
              <p className="text-center text-gray-500 mt-4 text-sm">
                💡 Usa esta pizarra para hacer tus cálculos y razonamientos matemáticos
              </p>
            </div>
          </div>
        </div>
      )}

      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-3xl p-12 text-center transform animate-bounce shadow-2xl ${isCorrect ? 'border-8 border-green-400' : 'border-8 border-red-400'}`}>
            <div className={`${isCorrect ? 'text-green-500' : 'text-red-500'} mb-4`}>
              {isCorrect ? <CheckIcon /> : <XIcon />}
            </div>
            <h3 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '¡Excelente!' : '¡Inténtalo de nuevo!'}
            </h3>
            {isCorrect && currentExercise?.feedback && (
              <p className="text-gray-600 text-lg">{currentExercise.feedback}</p>
            )}
            {isCorrect && (
              <div className="flex items-center justify-center mt-4 text-yellow-600">
                <StarIcon />
                <span className="ml-2 font-bold text-xl">+{lesson.xp_value} XP</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MathLessonModule;