import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Oval } from 'react-loader-spinner';
import { Navigate } from 'react-router';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Login = ({ login, loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const [activated, setActivated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setActivated(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (activated) return <Navigate to="/" />;

  return (
    <Layout>
      <div className="mt-24 min-h-full flex justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex bg-white shadow-xl border border-green-200 sm:rounded-xl w-full max-w-2xl flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-[30%] bg-gradient-to-br from-green-600 via-yellow-500 to-red-500 relative rounded-t-lg md:rounded-l-xl md:rounded-tr-none rounded-br-lg md:rounded-br-none md:h-full md:py-8">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white p-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Educación Rural</h3>
                <p className="text-sm opacity-90">Conectando comunidades a través del aprendizaje</p>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md px-8 py-8 flex-1">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
              <p className="text-gray-600 text-sm">Accede a tu plataforma educativa</p>
            </div>

            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="py-6 px-1">
                <form onSubmit={onSubmit} className="space-y-6" autoComplete="off">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Correo electrónico
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        type="email"
                        required
                        autoComplete="username"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        className="appearance-none block w-full px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <div className="mt-1 relative">
                      <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        className="appearance-none block w-full px-4 py-3 pr-12 border-2 border-green-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 text-gray-500 hover:text-green-600 transition-colors" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500 hover:text-green-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link to="/reset_password" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2">
                    {loading ? (
                      <button 
                        type="button"
                        disabled
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-green-400 cursor-not-allowed"
                      >
                        <Oval color="#fff" width={20} height={20} ariaLabel="loading" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-[0.98] transition-all duration-200"
                      >
                        Acceder a la Plataforma
                      </button>
                    )}
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    "La educación es el arma más poderosa que puedes usar para cambiar el mundo"
                  </p>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProps, { login })(Login);