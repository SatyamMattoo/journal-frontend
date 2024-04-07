import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="h-30 bg-primary/90 backdrop-filter backdrop-blur-lg sticky top-0 z-10">
      <div className="container w-screen mx-auto h-full flex flex-col items-center justify-center p-2">
        <div className="flex justify-center items-center flex-col text-white">
        <img
          src="https://hpuniv.ac.in/images-html/logonews.png"
          alt="Himachal Pradesh University"
        />
          <h1 className="text-2xl text-blue-40">International Center for Distance Edu. and Open Learning</h1>
          <p className="text-lg text-blue-40">(A State Government University Accredited with 'A' grade by NAAC)</p>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
