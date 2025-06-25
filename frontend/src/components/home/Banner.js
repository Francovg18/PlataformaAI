import { useState, useEffect, useRef } from 'react';
import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import img3 from "../../assets/img/img1.jpg";
import img4 from "../../assets/img/img2.jpg";
import img5 from "../../assets/img/img1.jpg";

const Banner = () => {
  const images = [img1, img2, img3, img4, img5];
  const texts = [
    "Aprende desde cualquier lugar",
    "Cursos interactivos y personalizados",
    "Espacio exclusivo para profesores",
    "Accede a contenido de calidad",
    "Mejora tus habilidades con IA"
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isHovering && autoplayEnabled) {
        setActiveIndex(prev => {
          const nextIndex = (prev + direction + images.length) % images.length;
          if (nextIndex === 0 || nextIndex === images.length - 1) {
            setDirection(prev => prev * -1);
          }
          return nextIndex;
        });
      }
    }, 8000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovering, autoplayEnabled, direction]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % images.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  const getTransform = (index) => {
    const diff = index - activeIndex;

    if (diff === 0) return {
      transform: 'translateX(0) scale(1.05) rotateY(0deg)',
      opacity: 1,
      zIndex: 20
    };

    if (diff === -1 || (diff === images.length - 1 && activeIndex === 0)) return {
      transform: 'translateX(-70%) scale(0.8) rotateY(30deg)',
      opacity: 0.7,
      zIndex: 10
    };

    if (diff === 1 || (diff === -(images.length - 1) && activeIndex === images.length - 1)) return {
      transform: 'translateX(70%) scale(0.8) rotateY(-30deg)',
      opacity: 0.7,
      zIndex: 10
    };

    if (diff < 0) return {
      transform: 'translateX(-120%) scale(0.6) rotateY(45deg)',
      opacity: 0.3,
      zIndex: 5
    };

    return {
      transform: 'translateX(120%) scale(0.6) rotateY(-45deg)',
      opacity: 0.3,
      zIndex: 5
    };
  };

  return (
    <div
      className="mb-16 mt-12 md:mt-20 relative w-full overflow-hidden bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg h-[280px] sm:h-[420px] md:h-[350px] lg:h-[500px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {images.map((src, index) => (
            <div
              key={index}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              style={{
                ...getTransform(index),
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onClick={() => handleDotClick(index)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl w-full md:w-4/5 h-3/4 group">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                  <h3 className="text-white text-2xl md:text-4xl font-bold">
                    {texts[index]}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-gray-700 hover:bg-blue-800 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        onClick={handlePrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-gray-700 hover:bg-blue-800 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        onClick={handleNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-red-500 w-8' : 'bg-blue-700 hover:bg-purple-700'}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl">left</div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Banner;
