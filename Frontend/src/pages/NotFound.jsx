import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  console.error("404 Error at:", location.pathname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg text-gray-600 mb-4">Page not found</p>
        <a href="/" className="text-blue-600 underline">Return Home</a>
      </div>
    </div>
  );
};

export default NotFound;
