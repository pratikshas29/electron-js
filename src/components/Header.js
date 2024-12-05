import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt,
  faUser,
  faArrowLeft,
  faTable,
  faHome
} from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    navigate('/login');
  };



  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
          
            
            <h1 className="text-xl font-semibold text-gray-900">
              Restaurant Manager
            </h1>
            
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate('/home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/home' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </button>
              <button
                onClick={() => navigate('/restaurant_sections')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.includes('/restaurant_sections') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FontAwesomeIcon icon={faTable} className="mr-2" />
                Tables
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                <span className="text-gray-900">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
