import React from 'react';
import Layout from '../hocs/Layout';
import {
  AcademicCapIcon,
  LightBulbIcon,
  GlobeAltIcon,
  TranslateIcon,
  ChipIcon,
  UserGroupIcon,
  HeartIcon
} from '@heroicons/react/solid';

function About() {
  return (
      <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">

        <section className="relative py-24 bg-gradient-to-br from-blue-900 to-black text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                Sobre nuestra <span className="text-yellow-400">Plataforma Educativa</span>
              </h1>
              <p className="text-xl font-light text-gray-300 max-w-3xl mx-auto">
                Apoyamos la educación intercultural en Bolivia a través de herramientas tecnológicas accesibles, multilingües e impulsadas por IA.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold flex items-center">
                  <AcademicCapIcon className="w-7 h-7 text-blue-600 mr-2" />
                  Nuestra Misión
                </h2>
                <p className="mt-4 text-gray-700">
                  Democratizar el acceso al aprendizaje en zonas rurales mediante una plataforma que combina traducción Aymara-Español, evaluaciones personalizadas y un asistente educativo basado en IA.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
                <h2 className="text-2xl font-bold flex items-center">
                  <LightBulbIcon className="w-7 h-7 text-blue-600 mr-2" />
                  Nuestra Visión
                </h2>
                <p className="mt-4 text-gray-700">
                  Ser la plataforma educativa más inclusiva y representativa del país, uniendo tecnología, cultura e inteligencia artificial para mejorar la calidad educativa en Bolivia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Lo que nos hace diferentes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: TranslateIcon, title: "Bilingüe Aymara-Español", desc: "Facilitamos el aprendizaje en ambos idiomas para preservar la cultura y mejorar la comprensión." },
                { icon: ChipIcon, title: "IA Educativa", desc: "Incluye un asistente inteligente que responde preguntas y sugiere recursos según el progreso del estudiante." },
                { icon: UserGroupIcon, title: "Inclusión Social", desc: "Pensada para comunidades rurales y estudiantes con conectividad limitada." },
                { icon: HeartIcon, title: "Compromiso Social", desc: "Hecha por bolivianos para bolivianos. La educación es nuestro motor de cambio." },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-50 py-12 mt-10">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              "Yachayninchikwan sarnani" — Caminamos con nuestro conocimiento
            </h2>
            <p className="mt-4 text-gray-600">
              La plataforma busca fomentar el aprendizaje contextualizado y significativo, respetando la diversidad cultural y lingüística de Bolivia.
            </p>
          </div>
        </section>

      </div>
  );
}

export default About;