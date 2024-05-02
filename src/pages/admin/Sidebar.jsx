import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogOut, IoMailUnreadSharp, IoPerson } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaEnvelopeOpen } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-full lg:w-56 bg-primary/90 lg:min-h-[90vh] sticky top-0 lg:top-20 shadow-lg">
      <div className="flex lg:flex-col lg:justify-evenly items-center lg:h-full">
        <div className="lg:flex items-center gap-2 hidden">
          <img
            src="/assets/logo.png"
            alt="logo"
            width={40}
            height={40}
            className=""
          />
          <p className="text-white text-2xl font-bold">Dashboard</p>
        </div>
        <div className="flex lg:flex-col flex-wrap text-xs md:text-sm justify-center items-center w-full">
          <SidebarLink
            to="/admin/unassigned-articles"
            active={location.pathname === "/admin/unassigned-articles"}
          >
            <IoMailUnreadSharp />
            Unassigned Articles
          </SidebarLink>
          <SidebarLink
            to="/admin/underreview-articles"
            active={location.pathname === "/admin/underreview-articles"}
          >
            <FaEnvelopeOpen />
            Articles Under Review
          </SidebarLink>
          <SidebarLink
            to="/admin/reviewed-articles"
            active={location.pathname === "/admin/reviewed-articles"}
          >
            <MdMarkEmailRead />
            Reviewed Articles
          </SidebarLink>
          <SidebarLink
            to="/admin/reviewer"
            active={location.pathname === "/admin/reviewer"}
          >
            <IoPerson />
            Reviewers
          </SidebarLink>
          <SidebarLink
            to="/admin/announcements"
            active={location.pathname === "/admin/announcements"}
          >
            <TfiAnnouncement />
            Announcements
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
    className={`flex items-center gap-1 text-white p-4 w-full text-center font-medium transition-colors duration-300 border border-[#BDD1FF] ${
      active
        ? "bg-blue-500 text-gray-200 hover:bg-blue-900"
        : "hover:bg-secondary cursor-pointer"
    }`}
  >
    {children}
  </Link>
);

export default Sidebar;
