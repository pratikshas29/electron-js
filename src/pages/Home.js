import React, { useState } from 'react';

import Header from '../components/Header';


function Home() {
 

  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
       
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
              <h2 className="text-2xl font-semibold text-gray-600">
                Welcome to your Dashboard
              </h2>
            </div>
          </div>
        
      </main>
    </div>
  );
}

export default Home;
