import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../redux/actions/auth';
import Logo from '../../assets/ed.gif';
import { 
  UserCircleIcon, 
  AcademicCapIcon, 
  ChatIcon, 
  TranslateIcon, 
  HomeIcon,
  LogoutIcon,
  LoginIcon,
  UserAddIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';
import Alert from '../../components/alert';

const Navbar = ({ isAuthenticated, user, logout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-orange-400">
        {/* Barra de colores bolivianos */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo y título */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10  rounded-lg flex items-center justify-center ">
                  <img src={Logo} alt="Logo" className="w-14 h-14 rounded-lg object-cover" />

                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  Plataforma Educativa AI
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Educación intercultural para Bolivia
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Inicio</span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link
<<<<<<< HEAD
  to="/chat"
  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
>
  <ChatIcon className="h-4 w-4 text-blue-600" />
  <span className="text-sm font-medium text-blue-700">Asistente IA</span>
</Link>
=======
                  to="/chat"
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
                >
                  <ChatIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Asistente IA</span>
                </Link>
>>>>>>> a074832a (update)

                <div className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200">
                  <TranslateIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Aymara - Español</span>
                </div>
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {user && user.role === 'profesor' && (
                    <Link 
                      to="/r" 
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      <UserCircleIcon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-sm font-semibold">Profesor</div>
                        <div className="text-xs opacity-90">Panel de Control</div>
                      </div>
                    </Link>
                  )}

                  {user && user.role === 'estudiante' && (
                    <Link 
                      to="/r" 
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      <AcademicCapIcon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-sm font-semibold">Estudiante</div>
                        <Link to='/r' className="text-xs opacity-90">Mi Progreso</Link>
                      </div>
                    </Link>
                  )}

                  <button 
                    onClick={logoutHandler} 
                    className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    <LogoutIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Salir</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    <LoginIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Iniciar Sesión</span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    <UserAddIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Registrarse</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all duration-200"
              >
                <span className="sr-only">Abrir menú principal</span>
                {mobileMenuOpen ? (
                  <XIcon className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Quote */}
          <div className="hidden lg:block text-center py-2 border-t border-gray-100">
            <p className="text-sm text-gray-600 italic">
              "Yachayninchikwan sarnani" - Caminamos con nuestro conocimiento
            </p>
          </div>
        </div>

        {/* Mobile Menu - Mejorado */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl border-t border-orange-200 relative z-50">
            <div className="px-4 pt-2 pb-3 space-y-1">
              
              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 active:bg-orange-100"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Inicio</span>
              </Link>

              <Link
                to="/chat"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 active:bg-blue-200"
              >
                <ChatIcon className="h-5 w-5" />
                <span>Asistente Vocacional</span>
              </Link>


              {/* Mobile User Section */}
              <div className="pt-4 pb-3 border-t border-orange-200 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    {user && user.role === 'profesor' && (
                      <Link 
                        to="/r" 
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 active:from-orange-700 active:to-red-700"
                      >
                        <UserCircleIcon className="h-6 w-6" />
                        <div className="text-left">
                          <div className="text-base font-semibold">Panel de Profesor</div>
                          <div className="text-sm opacity-90">Gestionar clases</div>
                        </div>
                      </Link>
                    )}

                    {user && user.role === 'estudiante' && (
                      <Link 
                        to="/r" 
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 active:from-blue-700 active:to-purple-700"
                      >
                        <AcademicCapIcon className="h-6 w-6" />
                        <div className="text-left">
                          <div className="text-base font-semibold">Mi Progreso</div>
                          <div className="text-sm opacity-90">Ver calificaciones</div>
                        </div>
                      </Link>
                    )}

                    <button 
                      onClick={logoutHandler} 
                      className="flex items-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 w-full active:bg-gray-800"
                    >
                      <LogoutIcon className="h-5 w-5" />
                      <span className="text-base font-medium">Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      to="/login" 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 active:bg-blue-800"
                    >
                      <LoginIcon className="h-5 w-5" />
                      <span className="text-base font-medium">Iniciar Sesión</span>
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 active:bg-green-800"
                    >
                      <UserAddIcon className="h-5 w-5" />
                      <span className="text-base font-medium">Registrarse</span>
                    </Link>
                  </div> 
                )}
              </div>

              {/* Mobile Quote */}
              <div className="pt-4 border-t border-orange-200">
                <p className="text-sm text-gray-600 italic text-center px-4">
                  "Yachayninchikwan sarnani"<br />
                  <span className="text-xs">Caminamos con nuestro conocimiento</span>
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Alert/>
      </nav>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
