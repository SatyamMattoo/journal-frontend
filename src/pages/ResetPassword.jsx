import React, { useState } from "react";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../store/api/authApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = formData;

  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation(); // Use your resetPassword mutation from RTK Query

  if (isError) {
    console.log(error);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const data = { newPassword, confirmPassword, token };
      // Call the resetPassword mutation with the token and new password
      const response = await resetPassword(data);

      if (response.data) {
        toast.success("Password reset successfully");
      } else {
        // Handle errors
        console.error("Problem resetting password:", response.error);
        toast.error("Problem resetting password");
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Error resetting password:", error);
      toast.error("Problem resetting password");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen m-5 flex justify-center items-center flex-col">
          <div className="conatiner mx-auto flex justify-center items-center custom-shadow w-1/2 rounded-lg">
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col w-full m-12 gap-4"
            >
              <h1 className="text-3xl font-bold text-center">
                Enter new password
              </h1>
              <input
                type="password"
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="New password"
              />
              <input
                type="password"
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
              <button
                type="submit"
                className="p-2 mt-8 rounded-full bg-secondary hover:bg-primary"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Reseting..." : "Reset"}{" "}
              </button>
              {isError && (
                <div>
                  <span className="text-red-500">Error: </span>
                  {error.data.message}
                </div>
              )}
              {isSuccess && (
                <div>
                  <span className="text-green-500">
                    Password Reset Successfully{" "}
                  </span>
                </div>
              )}
              <h4 className="text-sm text-gray-600">
                Want to create a account?
                <Link to="/register" className="text-primary hover:text-blue9">
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

export default ResetPassword;
