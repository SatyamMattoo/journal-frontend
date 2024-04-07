import React from "react";
import { Link } from "react-router-dom";

const Error = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">{error.message}</p>
        <Link
          to="/"
          className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
