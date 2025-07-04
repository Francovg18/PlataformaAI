import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../redux/actions/auth';
import { 
  UserCircleIcon, 
  AcademicCapIcon, 
  ChatIcon, 
  TranslateIcon, 
  HomeIcon,
  LogoutIcon,
  LoginIcon,
  UserAddIcon
} from '@heroicons/react/outline';
import Alert from '../../components/alert';

const Navbar = ({ isAuthenticated, user, logout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-orange-400">
        <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Plataforma Educativa AI
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Educación intercultural para Bolivia
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <HomeIcon className="h-4 w-4" />
                <span>Inicio</span>
              </Link>

              <div className="flex items-center space-x-4">
                <Link
  to="/chat"
  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200"
>
  <ChatIcon className="h-4 w-4 text-blue-600" />
  <span className="text-sm font-medium text-blue-700">Asistente IA</span>
</Link>

                <div className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200">
                  <TranslateIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Aymara - Español</span>
                </div>
              </div>
            </div>

            {/* usuario */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {user && user.role === 'profesor' && (
                    <Link 
                      to="/dashboard" 
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
                      to="/dashboard" 
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      <AcademicCapIcon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-sm font-semibold">Estudiante</div>
                        <div className="text-xs opacity-90">Mi Progreso</div>
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
          </div>

          <div className="hidden sm:block text-center py-2 border-t border-gray-100">
            <p className="text-sm text-gray-600 italic">
              "Yachayninchikwan sarnani" - Caminamos con nuestro conocimiento
            </p>
          </div>
        </div>
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
