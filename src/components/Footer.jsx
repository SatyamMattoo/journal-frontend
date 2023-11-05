import React from "react";
import { FaGithubSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-2">
      <div className="container mx-auto flex ">
        <div className="flex items-center justify-between text-xs w-full">
          <div className="logo md:hidden mx-4">
            <img src={Logo} alt="logo" width={60} height={60} />
          </div>
          <div className="address hidden md:flex items-center">
            <div className="logo mx-4">
              <img src={Logo} alt="logo" width={70} />
            </div>
            <p className="text-gray-600">
              E-journal App, By Satyam Mattoo
              <br />
              Full Stack Developer
            </p>
          </div>
          <div className="contact flex flex-col items-start">
            <h2 className="font-semibold text-[14px] mb-1 text-gray-600 ">
              Contacts
            </h2>
            <div className="flex">
              <div className="flex flex-col justify-center items-start text-gray-600">
                <p className="text-gray-600">🕿 +91 7876740985</p>
                <p className="text-gray-600">
                  <a href="mailto:vc@hpuniv.ac.in" target="_blank">
                    ✉ satyammattoo2003@gmail.com
                  </a>
                </p>
                <a href="mailto:vc_hpu@hotmail.com" target="_blank">
                  ✉ ejournalmattoo@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="socials flex flex-col items-start">
            <h2 className="font-semibold text-[14px] mb-1 text-gray-600">
              Socails
            </h2>
            <div className="flex">
              <div className="flex flex-col">
                <div className="facebook flex items-center ">
                  <FaLinkedin className="bg-blue9" />
                  <a
                    href="www.linkedin.com/in/satyam-mattoo"
                    className="mx-1 text-gray-600"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="twitter flex items-center ">
                  <FaTwitterSquare className="bg-blue9" />
                  <a
                    href="https://twitter.com/SatyamMattoo07"
                    className="mx-1 text-gray-600"
                  >
                    Twitter
                  </a>
                </div>
                <div className="youtube flex items-center">
                  <FaGithubSquare className="bg-blue9" />
                  <a
                    href="https://github.com/SatyamMattoo"
                    className="mx-1 text-gray-600"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
