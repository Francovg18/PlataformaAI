import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, deleteCourse } from '../../redux/actions/course';
import { 
  BookOpenIcon, 
  ClockIcon, 
  StarIcon, 
  UserIcon, 
  GlobeIcon, 
  TrashIcon, 
  CalendarIcon,
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
  PlusIcon,
  ExclamationIcon,
  EyeIcon,
  PencilIcon,
  DuplicateIcon,
  ShareIcon,
  ChartBarIcon,
  UsersIcon,
  LightningBoltIcon
} from '@heroicons/react/outline';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector(state => state.Courses);
  const { user } = useSelector(state => state.Auth); 
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      dispatch(deleteCourse(deleteConfirm));
      setDeleteConfirm(null);
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-BO', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const userCourses = Array.isArray(courses) ? 
    courses.filter(course => course.creator === user?.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      

      <div className="max-w-7xl mx-auto mb-8 relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <BookOpenIcon className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                  Mis Cursos Educativos
                </h1>
                <p className="text-slate-600 text-sm">Transformando la educación en Bolivia con contenido innovador</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <GlobeIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-3 rounded-2xl border border-blue-200/50">
                <UserIcon className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">
                  Prof. {user?.first_name} {user?.last_name}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-3 rounded-2xl border border-emerald-200/50">
                <StarIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-800 font-semibold">
                  {userCourses.length} curso{userCourses.length !== 1 ? 's' : ''} creado{userCourses.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3 rounded-2xl border border-amber-200/50">
                <ChartBarIcon className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-semibold">Dashboard Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-8 relative">
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
                <PlusIcon className="w-5 h-5" />
                Crear Nuevo Curso
              </button>
              <button className="bg-white/80 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 flex items-center gap-2">
                <DuplicateIcon className="w-5 h-5" />
                Duplicar Curso
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white/80 text-slate-700 p-3 rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="bg-white/80 text-slate-700 p-3 rounded-xl hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200">
                <EyeIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {userCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userCourses.map(course => {
              const CategoryIcon = getCategoryIcon(course.category);
              return (
                <div 
                  key={course.id} 
                  className="group"
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 transition-opacity duration-500 ${hoveredCard === course.id ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <div className="relative overflow-hidden">
                      {course.cover_image ? (
                        <img
                          src={course.cover_image}
                          alt={`Curso: ${course.title}`}
                          className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-52 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-500 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                          <CategoryIcon className="w-20 h-20 text-white/90 transform group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-slate-700 shadow-lg border border-white/20 flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4" />
                          {course.category}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-sm ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="p-6 relative">
                      {/* titulo */}
                      <h3 className="text-xl font-bold text-slate-800 -mt-3 line-clamp-2 group-hover:text-violet-600 transition-colors duration-300">
                        {course.title}
                      </h3>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200/30">
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-800">Duración</span>
                          </div>
                          <p className="text-sm font-bold text-blue-900 mt-1">{course.estimated_duration}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-xl border border-amber-200/30">
                          <div className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-medium text-amber-800">Recompensa</span>
                          </div>
                          <p className="text-sm font-bold text-amber-900 mt-1">{course.xp_reward} XP</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        {course.language && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <GlobeIcon className="w-4 h-4 text-emerald-500" />
                            <span>Idioma: {course.language}</span>
                          </div>
                        )}
                        
                        {course.created_at && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarIcon className="w-4 h-4 text-purple-500" />
                            <span>Creado: {formatDate(course.created_at)}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                        <div className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                          ID: {course.id}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-all duration-200 hover:shadow-md">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50"></div>
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-6 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <CollectionIcon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  ¡Comienza tu Aventura Educativa!
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Aún no tienes cursos creados. Es momento de compartir tu conocimiento 
                  y crear experiencias de aprendizaje increíbles para los estudiantes de Bolivia.
                </p>
                <button className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto">
                  <PlusIcon className="w-6 h-6" />
                  Crear Mi Primer Curso
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-rose-50/50"></div>
            <div className="relative z-10 text-center">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <ExclamationIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                ¿Eliminar Curso?
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Esta acción es permanente y no se puede deshacer. 
                El curso y todo su contenido serán eliminados para siempre.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-slate-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;