import React from "react";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="h-30 bg-gray-100 sticky top-0 z-20">
      <div className="container w-screen mx-auto h-full flex flex-col items-center justify-center p-2">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Himachal Pradesh University"
            className="w-40 h-20 object-cover mx-10"
          />
          <h1 className="text-2xl text-blue-400">Publish your articles with this E-Journal website</h1>
        </div>
      </div>
      <Sidebar />
    </header>
  );
};

export default Header;
