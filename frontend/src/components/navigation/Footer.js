import React from "react";
import { MapIcon, PhoneIcon, MailIcon, ChatAltIcon, UserGroupIcon, BookOpenIcon, AcademicCapIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-blue-100 bg-clip-text text-transparent">Plataformaaaa AI</h2>
                        <p className="text-sm text-indigo-300 mt-1">Educación sin límites para todos</p>
                    </div>

                    <div className="flex space-x-6">
                        <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                            <i className="fab fa-facebook-f text-xl"></i>
                        </Link>
                        <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                            <i className="fab fa-twitter text-xl"></i>
                        </Link>
                        <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                            <i className="fab fa-instagram text-xl"></i>
                        </Link>
                        <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                            <i className="fab fa-linkedin-in text-xl"></i>
                        </Link>
                    </div>
                </div>

                <div className="relative h-0.5 w-full bg-gray-800 mb-12 overflow-hidden">
                    <div className="absolute w-1/3 h-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">



                    
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        Copyright &copy; {new Date().getFullYear()} <span className="text-indigo-400">Plataforma AI</span> - Todos los derechos reservados.
                    </p>
                    <div className="flex justify-center mt-4 space-x-6 text-gray-500 text-sm">
                    
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
