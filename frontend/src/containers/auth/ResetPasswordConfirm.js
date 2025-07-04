import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../redux/actions/auth';
import { Oval } from 'react-loader-spinner';
import { Navigate, useParams } from 'react-router';

const ResetPasswordConfirm = ({ reset_password_confirm, loading }) => {
  const params = useParams();
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;

    reset_password_confirm(uid, token, new_password, re_new_password);

    if (new_password === re_new_password) {
      setRequestSent(true);
    }
  };

  if (requestSent && !loading) return <Navigate to="/" />;

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">Establece tu nueva contraseña</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <div className="mt-1">
                  <input
                    name="new_password"
                    value={new_password}
                    onChange={onChange}
                    type="password"
                    placeholder="Nueva contraseña"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="re_new_password" className="block text-sm font-medium text-gray-700">
                  Repite la contraseña
                </label>
                <div className="mt-1">
                  <input
                    name="re_new_password"
                    value={re_new_password}
                    onChange={onChange}
                    type="password"
                    placeholder="Repite la contraseña"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                {loading ? (
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Oval color="#fff" width={20} height={20} ariaLabel="loading" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-midnight-blue hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Restablecer contraseña
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  loading: state.Auth.loading 
});

export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);
