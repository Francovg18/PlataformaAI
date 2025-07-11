import Layout from '../../hocs/Layout';
import { useParams } from 'react-router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { activate } from '../../redux/actions/auth';
import { Navigate } from 'react-router';
import { Oval } from 'react-loader-spinner';

const Activate = ({ activate, loading }) => {
    const params = useParams();
    const [activated, setActivated] = useState(false);

    const activate_account = () => {
        const uid = params.uid;
        const token = params.token;
        activate(uid, token);
        setActivated(true);
    };

    if (activated && !loading) {
        return <Navigate to='/login' />;
    }

    return (
        <Layout>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='max-w-3xl mx-auto text-center'>
                    <h1 className='text-3xl font-bold mt-12 mb-6'>Activar cuenta</h1>
                    <p className='mb-6 text-lg text-gray-700'>
                        Por favor haz clic en el siguiente botón para activar tu cuenta en la plataforma educativa.
                    </p>

                    {loading ? (
                        <button
                            className="inline-flex mt-4 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Oval height={20} width={20} color="#fff" ariaLabel="loading" />
                        </button>
                    ) : (
                        <button
                            onClick={activate_account}
                            className="inline-flex mt-4 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Activar cuenta
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = state => ({
    loading: state.Auth.loading,
});

export default connect(mapStateToProps, { activate })(Activate);
