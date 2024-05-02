import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../store/api/authApi";
import Cookies from "js-cookie";
import { clearUser } from "../store/state/auth";
import toast from "react-hot-toast";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user.role);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Close the sidebar on small screens when the component mounts
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logout();

      dispatch(clearUser());

      Cookies.set("token", null);
      toast.success(response.data.message);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(!isSidebarOpen);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <nav className="sticky top-30 md:w-full md:flex z-0 border-y">
      <div className="md:hidden">
        <button
          onClick={() => toggleSidebar()}
          className=" menu-button top-30 z-30 text-white p-2 rounded-md"
        >
          <div className="flex flex-col">
            <div className="w-4 h-1 m-1 bg-white"></div>
            <div className="w-4 h-1 m-1 bg-white"></div>
          </div>
        </button>
      </div>
      <div
        className={`sidebar mx-auto w-full flex flex-col md:flex-row z-10 justify-around ${
          isSidebarOpen ? "md:flex" : "hidden"
        }`}
      >
        <Link
          to="/"
          onClick={() => toggleSidebar()}
          className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
        >
          Home
        </Link>
        {isAuthenticated && role === "admin" && (
          <Link
            to="/admin/unassigned-articles"
            onClick={() => toggleSidebar()}
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated && role === "editor" && (
          <Link
            onClick={() => toggleSidebar()}
            to="/editor/assigned-articles"
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Dashboard
          </Link>
        )}
        <Link
          onClick={() => toggleSidebar()}
          to="/archives"
          className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
        >
          Archives
        </Link>
        <Link
          onClick={() => toggleSidebar()}
          to="/editorialboard"
          className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
        >
          Editorial Board
        </Link>
        {isAuthenticated && (
          <Link
            onClick={() => toggleSidebar()}
            to="/submission"
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Submissions
          </Link>
        )}
        {isAuthenticated && (
          <Link
            onClick={() => toggleSidebar()}
            to="/track"
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Track Papers
          </Link>
        )}

        {!isAuthenticated && (
          <Link
            onClick={() => toggleSidebar()}
            to="/auth"
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Login/Register
          </Link>
        )}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-white p-2 h-full flex justify-center items-center w-full text-center transition-all ease-in-out duration-500 hover:bg-primary cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
