import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faPlus,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';

function RestaurantSections() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Sample data for restaurant sections
  const sections = [
    { 
      id: 1, 
      name: 'Bar Section', 
      total: 6,
      engaged: 4,
      free: 2
    },
    { 
      id: 2, 
      name: 'Family Section', 
      total: 12,
      engaged: 8,
      free: 4
    },
    { 
      id: 3, 
      name: 'Outdoor Garden', 
      total: 8,
      engaged: 3,
      free: 5
    },
    { 
      id: 4, 
      name: 'Private Dining', 
      total: 4,
      engaged: 2,
      free: 2
    }
  ];

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   
    <div className=" min-h-screen bg-gray-50">
     <Header></Header>
      {/* Header with Add Button */}
    
      {/* Search and Sort Bar */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm p-4  mt-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="name">Name</option>
              <option value="total">Total</option>
              <option value="available">Available</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {filteredSections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => navigate('/sections')}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {section.name}
                  </h3>
                  <div className="flex items-center space-x-6 text-sm">
                    <span className="text-gray-600">
                      Total: {section.total}
                    </span>
                    <span className="text-red-600">
                      Engaged: {section.engaged}
                    </span>
                    <span className="text-green-600">
                      Free: {section.free}
                    </span>
                  </div>
                </div>
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  className="text-gray-400 h-5 w-5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default RestaurantSections;
