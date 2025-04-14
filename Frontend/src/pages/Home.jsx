import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="text-center max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-blue-600">Kinnected</span></h1>
      <p className="text-xl text-gray-600 mb-8">Reimagine your family connections.</p>
      <div className="flex gap-4 justify-center">
        <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</Link>
        <Link to="/register" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">Register</Link>
      </div>
    </div>
  </div>
);

export default Home;
