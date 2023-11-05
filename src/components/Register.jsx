import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi";
import Loader from "./Loader";
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

    console.log(formData);
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
        response.data.message && toast.success(response.data.message);
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
    <form onSubmit={handleSubmit} method="POST">
      <p className="mb-5 text-mauve11 text-[15px] leading-normal">
        Enter your details to Register.
      </p>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-blue12 block"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          name="name"
          type="text"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-blue12 block"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-blue12 block"
          htmlFor="email"
        >
          Department
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          type="text"
          name="department"
          placeholder="Enter Your Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-blue12 block"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </fieldset>
      <div className="flex flex-col justify-end mt-5">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-primary text-gray-200 hover:bg-blue9 focus:shadow-[0_0_0_2px] focus:shadow-blue7 outline-none cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}{" "}
        </button>
        {isError && (
          <div>
            <span className="text-red-500">Error: </span>
            {error.data.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default Register;
