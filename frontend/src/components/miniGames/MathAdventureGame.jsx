import React, { useState, useEffect, useCallback } from 'react';
import { Star, Heart, Trophy, RotateCcw, Gem, Coins, Crown, Zap, TreePine, Leaf } from 'lucide-react';

const JungleMathAdventure = () => {
  const [gameState, setGameState] = useState('menu'); 
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 300 });
  const [treasures, setTreasures] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [collectSound, setCollectSound] = useState(false);
  const [particles, setParticles] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [playerDirection, setPlayerDirection] = useState('right');
  const [showCelebration, setShowCelebration] = useState(false);
  const [animatedTrees, setAnimatedTrees] = useState([]);


  const generateQuestion = useCallback(() => {
    let question, answer, options;
    
    if (level <= 2) {
      // Suma y resta 
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      if (operation === '+') {
        question = `${a} + ${b}`;
        answer = a + b;
      } else {
        question = `${a + b} - ${b}`;
        answer = a;
      }
    } else if (level <= 4) {
      // Multiplicación
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      question = `${a} × ${b}`;
      answer = a * b;
    } else if (level <= 6) {
      // División
      const b = Math.floor(Math.random() * 9) + 1;
      const answer_temp = Math.floor(Math.random() * 12) + 1;
      const a = b * answer_temp;
      question = `${a} ÷ ${b}`;
      answer = answer_temp;
    } else {
      const numerator = Math.floor(Math.random() * 8) + 1;
      const denominator = Math.floor(Math.random() * 8) + 2;
      const whole = Math.floor(Math.random() * 3) + 1;
      question = `¿Cuánto es ${numerator}/${denominator} + ${whole}?`;
      answer = Math.round((numerator / denominator + whole) * 100) / 100;
    }

    options = [answer];
    while (options.length < 4) {
      let wrongAnswer;
      if (level <= 6) {
        wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
      } else {
        wrongAnswer = Math.round((answer + Math.random() * 2 - 1) * 100) / 100;
      }
      if (wrongAnswer !== answer && wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    return { question, answer, options };
  }, [level]);

  const treasureTypes = [
    { icon: Gem, color: 'text-purple-500', bg: 'bg-purple-100', emoji: '💎' },
    { icon: Coins, color: 'text-yellow-500', bg: 'bg-yellow-100', emoji: '🪙' },
    { icon: Crown, color: 'text-orange-500', bg: 'bg-orange-100', emoji: '👑' },
    { icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100', emoji: '⚡' },
    { icon: Star, color: 'text-pink-500', bg: 'bg-pink-100', emoji: '⭐' }
  ];

  const powerUpTypes = [
    { emoji: '⏰', effect: 'time', name: 'Tiempo Extra' },
    { emoji: '❤️', effect: 'life', name: 'Vida Extra' },
    { emoji: '🎯', effect: 'points', name: 'Puntos x2' }
  ];

  const generateAnimatedTrees = useCallback(() => {
    const trees = [];
    for (let i = 0; i < 15; i++) {
      trees.push({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 150 + 50,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 3,
        type: Math.random() > 0.5 ? 'tree' : 'leaf'
      });
    }
    setAnimatedTrees(trees);
  }, []);

  const generateObstacles = useCallback(() => {
    const newObstacles = [];
    const obstacleCount = Math.min(level, 4);
    
    for (let i = 0; i < obstacleCount; i++) {
      newObstacles.push({
        id: i,
        x: Math.random() * 600 + 100,
        y: Math.random() * 250 + 120,
        emoji: ['🪨', '🌳', '🕳️'][Math.floor(Math.random() * 3)]
      });
    }
    setObstacles(newObstacles);
  }, [level]);

  const generatePowerUps = useCallback(() => {
    const newPowerUps = [];
    if (Math.random() > 0.7) { 
      const powerUpType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      newPowerUps.push({
        id: 1,
        x: Math.random() * 600 + 100,
        y: Math.random() * 250 + 120,
        type: powerUpType,
        collected: false
      });
    }
    setPowerUps(newPowerUps);
  }, []);

  const generateTreasures = useCallback(() => {
    const newTreasures = [];
    
    for (let i = 0; i < 3 + level; i++) {
      const treasureType = treasureTypes[Math.floor(Math.random() * treasureTypes.length)];
      newTreasures.push({
        id: i,
        x: Math.random() * 600 + 100,
        y: Math.random() * 250 + 120,
        type: treasureType,
        collected: false,
        pulse: Math.random() * 2,
        bounce: Math.random() * 1000
      });
    }
    setTreasures(newTreasures);
  }, [level]);

  const createParticles = (x, y, type = 'collect') => {
    const newParticles = [];
    const particleCount = type === 'celebration' ? 20 : 8;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + Math.random() * 60 - 30,
        y: y + Math.random() * 60 - 30,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 1,
        color: ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][Math.floor(Math.random() * 5)],
        size: type === 'celebration' ? Math.random() * 4 + 2 : Math.random() * 3 + 2
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, type === 'celebration' ? 2000 : 1000);
  };

  const startCelebration = () => {
    setShowCelebration(true);
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createParticles(Math.random() * 800, Math.random() * 400, 'celebration');
      }, i * 200);
    }
    setTimeout(() => setShowCelebration(false), 3000);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showQuestion || gameState !== 'playing') return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showQuestion, gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      generateTreasures();
      generateObstacles();
      generatePowerUps();
      generateAnimatedTrees();
      setTimeLeft(30 + level * 5);
    }
  }, [level, gameState, generateTreasures, generateObstacles, generatePowerUps, generateAnimatedTrees]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 0.015
      })).filter(p => p.life > 0));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  const movePlayer = (direction) => {
    if (showQuestion) return;
    
    setPlayerDirection(direction);
    
    setPlayerPos(prev => {
      let newX = prev.x;
      let newY = prev.y;
      const moveDistance = 35;
      
      switch (direction) {
        case 'left':
          newX = Math.max(20, prev.x - moveDistance);
          break;
        case 'right':
          newX = Math.min(750, prev.x + moveDistance);
          break;
        case 'up':
          newY = Math.max(100, prev.y - moveDistance);
          break;
        case 'down':
          newY = Math.min(400, prev.y + moveDistance);
          break;
      }
      
      return { x: newX, y: newY };
    });
  };

  useEffect(() => {
    treasures.forEach(treasure => {
      if (!treasure.collected) {
        const distance = Math.sqrt(
          Math.pow(playerPos.x - treasure.x, 2) + Math.pow(playerPos.y - treasure.y, 2)
        );
        
        if (distance < 45) {
          const question = generateQuestion();
          setCurrentQuestion(question);
          setShowQuestion(true);
          setSelectedAnswer(null);
          
          setTreasures(prev => prev.map(t => 
            t.id === treasure.id ? { ...t, collected: true } : t
          ));
        }
      }
    });
  }, [playerPos, treasures, generateQuestion]);

  useEffect(() => {
    powerUps.forEach(powerUp => {
      if (!powerUp.collected) {
        const distance = Math.sqrt(
          Math.pow(playerPos.x - powerUp.x, 2) + Math.pow(playerPos.y - powerUp.y, 2)
        );
        
        if (distance < 40) {
          setPowerUps(prev => prev.map(p => 
            p.id === powerUp.id ? { ...p, collected: true } : p
          ));
          
          createParticles(powerUp.x, powerUp.y);
          
          switch (powerUp.type.effect) {
            case 'time':
              setTimeLeft(prev => prev + 15);
              break;
            case 'life':
              setLives(prev => Math.min(prev + 1, 5));
              break;
            case 'points':
              setScore(prev => prev + 50);
              break;
          }
        }
      }
    });
  }, [playerPos, powerUps]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      if (answer === currentQuestion.answer) {
        setScore(prev => prev + 10 * level);
        setCollectSound(true);
        createParticles(playerPos.x + 30, playerPos.y + 30);
        setTimeout(() => setCollectSound(false), 500);
        
        const remainingTreasures = treasures.filter(t => !t.collected).length;
        if (remainingTreasures <= 1) {
          startCelebration();
          setTimeout(() => setGameState('levelComplete'), 1000);
        }
      } else {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameState('gameOver');
          }
          return newLives;
        });
        
        setTreasures(prev => prev.map(t => 
          t.collected && !treasures.find(treasure => treasure.id === t.id && !treasure.collected) ? 
          { ...t, collected: false } : t
        ));
      }
      
      setShowQuestion(false);
      setCurrentQuestion(null);
      setSelectedAnswer(null);
    }, 1000);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setPlayerPos({ x: 50, y: 300 });
    setTreasures([]);
    setObstacles([]);
    setPowerUps([]);
    setShowQuestion(false);
    setCurrentQuestion(null);
    setTimeLeft(30);
    setParticles([]);
    setPlayerDirection('right');
    setShowCelebration(false);
    setGameState('menu');
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setPlayerPos({ x: 50, y: 300 });
    setParticles([]);
    setPlayerDirection('right');
    setGameState('playing');
  };

  const startGame = () => {
    setGameState('playing');
  };

  if (gameState === 'menu') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-green-300 via-green-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random()}s`
            }}>
              <div className="text-4xl opacity-20">
                {['🌴', '🍃', '🌺', '🦋', '🐛', '🌿', '🦜', '🐒'][i]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 text-center max-w-md backdrop-blur-sm border-4 border-yellow-300">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mr-3 animate-bounce">
                <span className="text-4xl">🐵</span>
              </div>
              <div className="absolute -top-2 -right-2 animate-spin">
                <Gem className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🌟 Aventura Matemática 🌟
          </h1>
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">en la Jungla Mágica</h2>
          <p className="text-gray-700 mb-4 text-lg">¡Ayuda al mono aventurero a recolectar tesoros mágicos resolviendo problemas matemáticos!</p>
          <p className="text-sm text-blue-600 mb-6">💡 Usa las flechas del teclado o los botones para moverte</p>
          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-110 shadow-xl animate-pulse"
          >
            🚀 ¡Comenzar Aventura Épica! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-400 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}>
              <div className="text-2xl">
                {['🎉', '🎊', '⭐', '🏆', '💎', '👑', '🎈', '🌟'][i % 8]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 text-center max-w-md backdrop-blur-sm border-4 border-yellow-400">
          <div className="relative mb-6">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto animate-bounce" />
            <div className="absolute -top-2 -right-2 animate-spin">
              <Crown className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            🎊 ¡NIVEL CONQUISTADO! 🎊
          </h2>
          <div className="flex justify-center items-center mb-4">
            <Star className="w-8 h-8 text-yellow-500 mr-2 animate-spin" />
            <span className="text-2xl font-bold text-purple-600">Puntuación: {score}</span>
          </div>
          <p className="text-xl mb-6 text-orange-600 font-semibold">
            🏆 ¡Has dominado el Nivel {level} como un verdadero campeón! 🏆
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={nextLevel}
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-110 shadow-xl"
            >
              🚀 ¡Al Siguiente Desafío! 🚀
            </button>
            <button 
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              🏠 Menú Principal
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-red-400 via-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute animate-pulse" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}>
              <div className="text-3xl opacity-30">
                {['💔', '😢', '⭐', '🌧️', '☁️'][i % 5]}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 text-center max-w-md backdrop-blur-sm border-4 border-red-300">
          <div className="w-24 h-24 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-5xl">😵</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-4">
            💔 ¡Fin de la Aventura! 💔
          </h2>
          <div className="flex justify-center items-center mb-2">
            <Star className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold text-purple-600">Puntuación Final: {score}</span>
          </div>
          <p className="text-lg mb-6 text-red-600 font-semibold">
            🎯 Llegaste hasta el Nivel {level} - ¡Buen intento, aventurero!
          </p>
          <p className="text-sm text-gray-600 mb-6">
            💪 ¡No te rindas! Cada aventura te hace más fuerte
          </p>
          <button 
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-110 shadow-xl"
          >
            <RotateCcw className="w-6 h-6 inline mr-2" />
            🎮 ¡Nueva Aventura! 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 relative overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-gradient-to-r from-white/90 to-blue-100/90 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm border-2 border-blue-200">
          <span className="font-bold text-blue-700 text-lg">🎯 Nivel {level}</span>
        </div>
        <div className="bg-gradient-to-r from-white/90 to-yellow-100/90 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm border-2 border-yellow-200">
          <Star className="w-6 h-6 text-yellow-500 inline mr-1 animate-spin" />
          <span className="font-bold text-yellow-600 text-lg">{score}</span>
        </div>
        <div className="bg-gradient-to-r from-white/90 to-purple-100/90 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm border-2 border-purple-200">
          <span className="font-bold text-purple-600 text-lg">⏰ {timeLeft}s</span>
        </div>
        <div className="bg-gradient-to-r from-white/90 to-red-100/90 rounded-full px-4 py-2 shadow-lg flex backdrop-blur-sm border-2 border-red-200">
          {[...Array(5)].map((_, i) => (
            <Heart 
              key={i} 
              className={`w-6 h-6 mx-1 transition-all ${
                i < lives ? 'text-red-500 fill-current animate-pulse' : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/80 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm">
          <span className="text-sm font-semibold text-purple-600">
            🎮 Usa las flechas del teclado o los botones para moverte
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-3 z-10">
        <div></div>
        <button 
          onClick={() => movePlayer('up')}
          className="bg-gradient-to-t from-white/90 to-blue-200/90 hover:from-white hover:to-blue-300 rounded-2xl p-4 shadow-xl transition-all backdrop-blur-sm transform hover:scale-110 border-2 border-blue-300"
        >
          <div className="w-8 h-8 flex items-center justify-center text-2xl">⬆️</div>
        </button>
        <div></div>
        <button 
          onClick={() => movePlayer('left')}
          className="bg-gradient-to-l from-white/90 to-green-200/90 hover:from-white hover:to-green-300 rounded-2xl p-4 shadow-xl transition-all backdrop-blur-sm transform hover:scale-110 border-2 border-green-300"
        >
          <div className="w-8 h-8 flex items-center justify-center text-2xl">⬅️</div>
        </button>
        <div></div>
        <button 
          onClick={() => movePlayer('right')}
          className="bg-gradient-to-r from-white/90 to-yellow-200/90 hover:from-white hover:to-yellow-300 rounded-2xl p-4 shadow-xl transition-all backdrop-blur-sm transform hover:scale-110 border-2 border-yellow-300"
        >
          <div className="w-8 h-8 flex items-center justify-center text-2xl">➡️</div>
        </button>
        <div></div>
        <button 
          onClick={() => movePlayer('down')}
          className="bg-gradient-to-b from-white/90 to-red-200/90 hover:from-white hover:to-red-300 rounded-2xl p-4 shadow-xl transition-all backdrop-blur-sm transform hover:scale-110 border-2 border-red-300"
        >
          <div className="w-8 h-8 flex items-center justify-center text-2xl">⬇️</div>
        </button>
        <div></div>
      </div>

      <div className="relative w-full h-full">
        {animatedTrees.map(tree => (
          <div
            key={tree.id}
            className="absolute opacity-30"
            style={{ 
              left: tree.x, 
              top: tree.y,
              animation: `float 3s ease-in-out infinite ${tree.delay}s`
            }}
          >
            {tree.type === 'tree' ? (
              <TreePine className={`w-${Math.floor(tree.size/5) + 4} h-${Math.floor(tree.size/5) + 4} text-green-700`} />
            ) : (
              <Leaf className={`w-${Math.floor(tree.size/8) + 2} h-${Math.floor(tree.size/8) + 2} text-green-600`} />
            )}
          </div>
        ))}

        <div className="absolute top-32 left-20 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🦋</div>
        <div className="absolute top-48 right-32 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🐛</div>
        <div className="absolute top-64 left-1/3 text-2xl animate-pulse" style={{animationDelay: '2s'}}>🌺</div>
        <div className="absolute top-80 right-1/4 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🦜</div>

        {/* obstaculos al monito */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute transition-all duration-300"
            style={{ left: obstacle.x, top: obstacle.y }}
          >
            <div className="w-12 h-12 flex items-center justify-center text-4xl drop-shadow-lg">
              {obstacle.emoji}
            </div>
          </div>
        ))}

        {/* atributos al monito */}
        {powerUps.map(powerUp => !powerUp.collected && (
          <div
            key={powerUp.id}
            className="absolute transition-all duration-300 animate-pulse"
            style={{ 
              left: powerUp.x, 
              top: powerUp.y,
              animation: 'bounce 1s infinite, glow 2s ease-in-out infinite alternate'
            }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform border-4 border-yellow-300">
              <span className="text-2xl">{powerUp.type.emoji}</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
              {powerUp.type.name}
            </div>
          </div>
        ))}

        {treasures.map(treasure => !treasure.collected && (
          <div
            key={treasure.id}
            className="absolute transition-all duration-300"
            style={{ 
              left: treasure.x, 
              top: treasure.y,
              animation: `treasureBounce 2s infinite ${treasure.pulse}s, treasureGlow 3s ease-in-out infinite alternate`
            }}
          >
            <div className={`w-16 h-16 ${treasure.type.bg} rounded-full flex items-center justify-center shadow-xl transform hover:scale-125 transition-transform border-4 border-white relative`}>
              <treasure.type.icon className={`w-8 h-8 ${treasure.type.color}`} />
              <span className="absolute -top-2 -right-2 text-xl">{treasure.type.emoji}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        ))}

        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-pulse ${particle.color}`}
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life,
              width: particle.size,
              height: particle.size,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        ))}

        {/* monito el jugador */}
        <div
          className="absolute transition-all duration-200 z-10"
          style={{ left: playerPos.x, top: playerPos.y }}
        >
          <div className={`w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform border-4 border-orange-300 relative ${
            playerDirection === 'left' ? 'scale-x-[-1]' : ''
          }`}>
            <span className="text-4xl">{collectSound ? '🙈' : '🐵'}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            <div className="absolute -inset-1 rounded-full border-2 border-yellow-300 animate-ping opacity-20"></div>
          </div>
          <div className="absolute top-16 left-2 w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
        </div>

        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-8xl animate-bounce">🎉</div>
            <div className="text-6xl animate-pulse ml-4">🎊</div>
            <div className="text-7xl animate-spin ml-4">⭐</div>
          </div>
        )}
      </div>

      {showQuestion && currentQuestion && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white/95 to-purple-100/95 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl backdrop-blur-sm border-4 border-purple-300 relative">
            <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🧠</div>
            <div className="absolute -top-4 -right-4 text-3xl animate-pulse">✨</div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-200 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse">
                <span className="text-3xl">🤔</span>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                ¡Desafío Matemático!
              </h3>
              <div className="text-4xl font-bold text-purple-700 bg-white/50 rounded-2xl p-4 border-2 border-purple-300">
                {currentQuestion.question} = ?
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 text-2xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg border-2 ${
                    selectedAnswer === option
                      ? option === currentQuestion.answer
                        ? 'bg-gradient-to-r from-green-400 to-green-600 text-white border-green-300 animate-pulse'
                        : 'bg-gradient-to-r from-red-400 to-red-600 text-white border-red-300 animate-pulse'
                      : 'bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 border-purple-300 hover:shadow-xl'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">
              💡 ¡Piensa bien antes de responder!
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes treasureBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
        @keyframes treasureGlow {
          0% { box-shadow: 0 0 10px rgba(255,255,255,0.5); }
          100% { box-shadow: 0 0 20px rgba(255,255,0,0.8); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 15px rgba(255,255,0,0.5); }
          100% { box-shadow: 0 0 25px rgba(255,255,0,0.9); }
        }
      `}</style>
    </div>
  );
};

export default JungleMathAdventure;