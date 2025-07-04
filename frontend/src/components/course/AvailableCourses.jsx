import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../redux/actions/course';
import { getLessons } from '../../redux/actions/lessonM';
import { getProgress } from '../../redux/actions/progress';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, 
  ClockIcon, 
  StarIcon, 
  CheckCircleIcon, 
  PlayIcon,
  GlobeIcon,
  AcademicCapIcon,
  BeakerIcon,
  LibraryIcon,
  MapIcon,
  BookmarkIcon,
  ColorSwatchIcon,
  MusicNoteIcon,
  DesktopComputerIcon,
  TranslateIcon,
  CollectionIcon,
  LightningBoltIcon,
  BadgeCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  FireIcon,

} from '@heroicons/react/outline';

const AvailableCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filterCategory, setFilterCategory] = useState('todos');

  const { courses } = useSelector(state => state.Courses);
  const { lessons } = useSelector(state => state.Lessons || { lessons: [] });
  const { progress } = useSelector(state => state.Progress || { progress: { results: [] } });

  const progressArray = Array.isArray(progress) ? progress : progress?.results || [];

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getLessons());
    dispatch(getProgress());
  }, [dispatch]);

  const courseIdToLessonsMap = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.course]) acc[lesson.course] = [];
    acc[lesson.course].push(lesson.id);
    return acc;
  }, {});

  const isCourseCompleted = (courseId) => {
    const courseLessons = courseIdToLessonsMap[courseId] || [];
    const completedLessons = progressArray.filter(p => p.completed && courseLessons.includes(p.lesson));
    return completedLessons.length === courseLessons.length && courseLessons.length > 0;
  };

  const getCourseProgress = (courseId) => {
    const courseLessons = courseIdToLessonsMap[courseId] || [];
    const completedLessons = progressArray.filter(p => p.completed && courseLessons.includes(p.lesson));
    return courseLessons.length > 0 ? Math.round((completedLessons.length / courseLessons.length) * 100) : 0;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'fácil': case 'facil': case 'básico': case 'basico':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'intermedio': case 'medio':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'avanzado': case 'difícil': case 'dificil':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'matemáticas': AcademicCapIcon,
      'ciencias': BeakerIcon,
      'historia': LibraryIcon,
      'geografía': MapIcon,
      'literatura': BookmarkIcon,
      'arte': ColorSwatchIcon,
      'música': MusicNoteIcon,
      'tecnología': DesktopComputerIcon,
      'idiomas': TranslateIcon,
      'deportes': LightningBoltIcon,
      'default': CollectionIcon
    };
    return iconMap[category?.toLowerCase()] || iconMap.default;
  };

  const getUniqueCategories = () => {
    const categories = Array.isArray(courses) ? [...new Set(courses.map(course => course.category))] : [];
    return ['todos', ...categories];
  };

  const filteredCourses = Array.isArray(courses) ? 
    courses.filter(course => filterCategory === 'todos' || course.category === filterCategory) : [];

  const completedCount = filteredCourses.filter(course => isCourseCompleted(course.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
                <GlobeIcon className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Cursos Disponibles
                </h1>
                <p className="text-slate-600 text-sm">Descubre conocimiento de calidad mundial adaptado para Bolivia</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-3 rounded-xl">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-3 rounded-2xl border border-blue-200/50">
                <BookOpenIcon className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">
                  {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} disponible{filteredCourses.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-3 rounded-2xl border border-emerald-200/50">
                <BadgeCheckIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800 font-semibold">
                  {completedCount} completado{completedCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3 rounded-2xl border border-amber-200/50">
                <FireIcon className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-semibold">¡Sigue Aprendiendo!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto mb-8 relative">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-700 font-semibold">Filtrar por categoría:</span>
            {getUniqueCategories().map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                }`}
              >
                {category === 'todos' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto relative">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map(course => {
              const CategoryIcon = getCategoryIcon(course.category);
              const completed = isCourseCompleted(course.id);
              const progressPercent = getCourseProgress(course.id);
              
              return (
                <div 
                  key={course.id} 
                  className="group"
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      completed 
                        ? 'from-emerald-500/10 via-green-500/10 to-teal-500/10' 
                        : 'from-blue-500/10 via-cyan-500/10 to-teal-500/10'
                    } transition-opacity duration-500 ${hoveredCard === course.id ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative overflow-hidden">
                      {course.cover_image ? (
                        <img
                          src={course.cover_image}
                          alt={`Curso: ${course.title}`}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`w-full h-48 bg-gradient-to-br ${
                          completed 
                            ? 'from-emerald-400 via-green-500 to-teal-500' 
                            : 'from-blue-400 via-cyan-500 to-teal-500'
                        } flex items-center justify-center relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                          <CategoryIcon className="w-16 h-16 text-white/90 transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-semibold text-slate-700 shadow-lg border border-white/20 flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4" />
                          {course.category}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-sm ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>

                      {completed && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-emerald-500 rounded-full p-3 shadow-2xl">
                            <CheckCircleIcon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="p-6 relative">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-lg font-bold line-clamp-2 transition-colors duration-300 ${
                          completed ? 'text-emerald-700' : 'text-slate-800 group-hover:text-blue-600'
                        }`}>
                          {course.title}
                        </h3>
                        {completed && (
                          <BadgeCheckIcon className="w-6 h-6 text-emerald-500 flex-shrink-0 ml-2" />
                        )}
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Progress Bar */}
                      {progressPercent > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-600">Progreso</span>
                            <span className="text-xs font-bold text-slate-800">{progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                completed 
                                  ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                                  : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200/30">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-800">Duración</span>
                          </div>
                          <p className="text-sm font-bold text-blue-900 mt-1">
                            {course.estimated_duration || 'Variable'}
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-xl border border-amber-200/30">
                          <div className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-medium text-amber-800">XP</span>
                          </div>
                          <p className="text-sm font-bold text-amber-900 mt-1">
                            {course.xp_reward || 'Bonus'}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-slate-200/50">
                        {completed ? (
                          <button 
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 cursor-default"
                            disabled
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                            Curso Completado
                          </button>
                        ) : (
                          <button
                            onClick={() => navigate(`/courses/${course.id}/start`)}
                            className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <PlayIcon className="w-5 h-5" />
                            {progressPercent > 0 ? 'Continuar Curso' : 'Empezar Curso'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <BookOpenIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  No hay cursos disponibles
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {filterCategory === 'todos' 
                    ? 'No hay cursos disponibles en este momento. ¡Vuelve pronto para descubrir nuevo contenido educativo!'
                    : `No hay cursos disponibles en la categoría "${filterCategory}". Prueba con otra categoría o explora todos los cursos.`
                  }
                </p>
                <button 
                  onClick={() => setFilterCategory('todos')}
                  className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto"
                >
                  <GlobeIcon className="w-6 h-6" />
                  Ver Todos los Cursos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCourses;