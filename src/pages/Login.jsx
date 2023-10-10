import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useLoginMutation } from "../store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/state/auth";
import toast from "react-hot-toast";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user.role);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let route;
  if (userRole == "user") route = "/";
  if (userRole == "admin") route = "/admin";
  if (userRole == "editor") route = "/editor";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      // Check if the login was successfull
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
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={route ? route : "/"} />;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen m-5 flex justify-center items-center flex-col">
          <div className="conatiner mx-auto flex justify-center items-center card-gradient w-full md:w-1/2 rounded-lg">
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col w-full m-6"
            >
              <h1 className="text-3xl font-bold text-center">Log In</h1>
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
                placeholder="Enter a password"
              />
              <button
                type="submit"
                className="p-2 mt-8 rounded-full bg-secondary hover:bg-primary"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Loging In..." : "Log In"}{" "}
                {/* Change button text */}
              </button>
              {isError && (
                <div>
                  <span className="text-red-500">Error: </span>
                  {error.data.message}
                </div>
              )}
              <h4 className="text-sm mt-4">
                Forgot Password?
                <Link to="/forgot" className="hover:text-slate-200">
                  {" "}
                  Reset Here.
                </Link>
              </h4>
              <h4 className="text-sm mt-4">
                Don't have a account?
                <Link to="/register" className="hover:text-slate-200">
                  {" "}
                  Register Here.
                </Link>
              </h4>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
