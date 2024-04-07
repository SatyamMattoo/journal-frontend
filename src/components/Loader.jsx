import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full z-50 overflow-hidden flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-primary text-xl font-semibold">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-primary">
        This may take a few seconds, please don't close this page.
      </p>
    </div>
  );
};

export default Loader;
