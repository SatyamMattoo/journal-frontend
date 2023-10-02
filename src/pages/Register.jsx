import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/state/auth";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Register = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user.role);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  let route;
  if (userRole == "user") route = "/";
  if (userRole == "admin") route = "/admin";
  if (userRole == "editor") route = "/editor";

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);

      // Check if the registration was successful
      if (response.data) {
        dispatch(
          setUser({
            name: response.data.name,
            role: response.data.role,
          })
        );
        toast.success(response.data.message);
        navigate(route); // Redirect to the home page
      }
    } catch (e) {
      console.error("Registration error:", e);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen m-5 flex justify-center items-center flex-col">
          <div className="conatiner mx-auto flex justify-center items-center card-gradient w-full md:w-1/2 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full m-6"
              method="POST"
            >
              <h1 className="text-3xl font-bold text-center">Register</h1>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter Your Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter Your Email"
              />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter Your Department"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter a password"
              />
              <button
                type="submit"
                className="p-2 mt-8 rounded-full bg-secondary hover:bg-primary"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Registering..." : "Register"}{" "}
                {/* Change button text */}
              </button>
              {isError && (
                <div>
                  <span className="text-red-500">Error: </span>
                  {error.data.message}
                </div>
              )}
              <h4 className="text-sm mt-4">
                Already have an account?
                <Link to="/login" className="hover:text-slate-200">
                  {" "}
                  Log In.
                </Link>
              </h4>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
