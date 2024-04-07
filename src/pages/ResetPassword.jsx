import React from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

import { useResetPasswordMutation } from "../store/api/authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = React.useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await resetPassword({ ...formData, token });
      if (response.data) {
        toast.success("Password reset successfully");
      } else {
        toast.error(response.error.data.message);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      toast.error("Problem resetting password");
    }
  };

  return (
    <section className="h-screen mt-32 flex items-center flex-col">
      <div className="container mx-auto flex justify-center items-center custom-shadow w-full md:w-1/4 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col w-full m-12 gap-4">
          <h1 className="text-2xl font-bold text-center text-primary">
            Enter new password
          </h1>
          <PasswordInput
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New password"
          />
          <PasswordInput
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          <SubmitButton isLoading={isLoading} />
          {isError && <ErrorMessage error={error.data.message} />}
          {isSuccess && <SuccessMessage />}
          <LoginLink />
        </form>
      </div>
    </section>
  );
};

const PasswordInput = ({ name, value, onChange, placeholder }) => (
  <input
    type="password"
    className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
    name={name}
    value={value}
    onChange={onChange}
    required
    placeholder={placeholder}
  />
);

const SubmitButton = ({ isLoading }) => (
  <button
    type="submit"
    className="w-1/2 self-start p-2 rounded-lg bg-primary hover:bg-blue9 text-white disabled:bg-gray-400 transition-all ease-in-out duration-500"
    disabled={isLoading}
  >
    {isLoading ? "Reseting..." : "Reset"}
  </button>
);

const ErrorMessage = ({ error }) => (
  <div>
    <span className="text-red-500">Error: </span>
    {error}
  </div>
);

const SuccessMessage = () => (
  <div>
    <span className="text-green-500">Password Reset Successfully</span>
  </div>
);

const LoginLink = () => (
  <h4 className="text-sm text-gray-600">
    Want to create a account?
    <Link to="/register" className="text-primary hover:text-blue9">
      {" "}
      Register Here.
    </Link>
  </h4>
);

export default ResetPassword;