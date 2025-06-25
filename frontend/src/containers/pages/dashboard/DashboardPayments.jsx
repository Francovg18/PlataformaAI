import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";

import DashboardLink from "../../../components/dashboard/DashboardLink";
import { XIcon, MenuIcon, CreditCardIcon, TruckIcon, DocumentTextIcon } from "@heroicons/react/outline";

moment.locale("es");

const PanelPagos = ({
  isAuthenticated,
  user
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col w-72 max-w-xs bg-white shadow-xl rounded-r-xl overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-midnight-blue to-purple-night">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Mi Cuenta</h2>
                <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition" onClick={() => setSidebarOpen(false)}>
                  <XIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            <nav className="mt-5 p-4 space-y-3">
              <DashboardLink />
            </nav>
          </div>
        </div>
      )}

      {/* Para escritorio */}
      <aside className="hidden md:flex md:w-72 md:flex-col bg-white border-r border-gray-200 shadow-lg fixed h-full">
        <div className="p-5 bg-gradient-to-r from-midnight-blue to-purple-night">
          <h2 className="text-xl font-bold text-white">Mi Cuenta</h2>
        </div>
        <div className="p-4">
          <Link to="/" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-midnight-blue bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 transition">
            Regresar a Inicio
          </Link>
        </div>
        <nav className="mt-2 p-4 space-y-2">
          <DashboardLink />
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 md:ml-72">
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center md:hidden">
                <button 
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Historial de Pedidos</h1>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="h-8 w-8 text-midnight-blue" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto sm:px-6 lg:px-8 py-8 max-w-4xl">
          
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps, {

})(PanelPagos);