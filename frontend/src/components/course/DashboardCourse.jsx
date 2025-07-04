import React from 'react';
import DashboardProfe from './DashboardProfe';
import DashboardEstudent from './DashboardEstudent';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const DashboardCourse = () => {
  const { user, isAuthenticated } = useSelector(state => state.Auth);

  if (!isAuthenticated) {

  }

  if (user?.role === 'profesor') {
    return <DashboardProfe />;
  }

  if (user?.role === 'estudiante') {
    return <DashboardEstudent />;
  }

  return (
    <div className="text-center py-10 text-gray-500 text-xl">
      <p className="mt-2 text-sm text-gray-600">
                    Inicia sesion para accedera los recursos de la plataforma
                    <Link to="/login" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                      Vamos a ello!!!
                    </Link>
                    </p>
    </div>
  );
};

export default DashboardCourse;
