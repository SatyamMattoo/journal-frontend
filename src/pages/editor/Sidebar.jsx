import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogOut, IoMailUnreadSharp } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-full lg:w-56 bg-primary/90 h-[10vh] lg:h-[85vh] sticky top-0 lg:top-20 shadow-lg">
      <div className="flex lg:flex-col justify-evenly items-center lg:h-full">
        <div className="lg:flex items-center gap-2 hidden ">
          <img
            src="/assets/logo.png"
            alt="logo"
            width={40}
            height={40}
            className=""
          />
          <p className="text-white text-2xl font-bold">Dashboard</p>
        </div>
        <div className="flex lg:flex-col justify-center items-center w-full">
          <SidebarLink
            to="/editor/assigned-articles"
            active={location.pathname === "/editor/assigned-articles"}
          >
            <IoMailUnreadSharp />
            Assigned Articles
          </SidebarLink>
          <SidebarLink
            to="/editor/previous-articles"
            active={location.pathname === "/editor/previous-articles"}
          >
            <MdMarkEmailRead />
            Reviewed Articles
          </SidebarLink>
        </div>
        <button className="lg:flex items-center gap-2 text-white p-4 w-full text-center font-medium transition-colors duration-300 border border-[#BDD1FF] hidden">
          <IoLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 text-white p-4 w-full text-center font-medium transition-colors duration-300 border border-[#BDD1FF] ${
      active
        ? "bg-blue-500 text-gray-200 hover:bg-blue-900"
        : "hover:bg-secondary cursor-pointer"
    }`}
  >
    {children}
  </Link>
);

export default Sidebar;
