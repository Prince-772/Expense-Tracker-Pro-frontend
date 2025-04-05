import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-center px-4 pt-10">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
