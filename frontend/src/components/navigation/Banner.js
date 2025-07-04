import React from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  GlobeAltIcon,
  CalculatorIcon
} from '@heroicons/react/solid';

const minigames = [
  {
    title: 'Matemáticas Divertidas',
    description: 'Practica sumas, restas y mucho más con retos interactivos.',
    icon: <CalculatorIcon className="h-10 w-10 text-blue-600" />,
    link: '/matematicas'
  },
  {
    title: 'Historia Interactiva',
    description: 'Aprende historia jugando y viajando en el tiempo.',
    icon: <BookOpenIcon className="h-10 w-10 text-yellow-600" />,
    link: '/juegos/historia'
  },
  {
    title: 'Explora el Mundo',
    description: 'Pon a prueba tus conocimientos de geografía y cultura.',
    icon: <GlobeAltIcon className="h-10 w-10 text-green-600" />,
    link: '/juegos/geografia'
  },
  {
    title: 'Lenguaje y Palabras',
    description: 'Juegos para mejorar tu lectura, ortografía y vocabulario.',
    icon: <AcademicCapIcon className="h-10 w-10 text-purple-600" />,
    link: '/juegos/lenguaje'
  }
];

const Banner = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-28">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ¡Diviértete con estos Minijuegos Educativos!
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          Aprende jugando y fortalece tus competencias en distintas materias.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {minigames.map((game, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-orange-100"
            >
              <div className="flex justify-center mb-4">
                {game.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{game.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{game.description}</p>
              <Link
                to={game.link}
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition transform"
              >
                ¡Vamos a jugar!
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
