import React from "react";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header className="h-30 bg-primary sticky top-0 z-20">
      <div className="container w-screen mx-auto h-full flex flex-col items-center justify-center p-2">
        <img
          src="https://hpuniv.ac.in/images-html/logonews.png"
          alt="Himachal Pradesh University"
        />
        <h2 className="text-sm md:text-xl p-1">
          International Center for Distance Edu. and Open Learning
        </h2>
        <p className="hidden md:block text-sm">
          (A State Government University Accredited with 'A' grade by NAAC)
        </p>
      </div>
        <Sidebar/>
    </header>
  );
};

export default Header;
