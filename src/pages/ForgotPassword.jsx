import React, { useState } from "react";
import Loader from "../components/Loader";
import { useSendResetMailMutation } from "../store/api/authApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [sendResetMail, { data, isLoading, isError,isSuccess, error }] = useSendResetMailMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendResetMail(formData);
    setFormData({ email: "" });
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen m-5 flex justify-center items-center flex-col">
          <div className=" mx-auto flex justify-center items-center custom-shadow w-full lg:w-1/2 rounded-lg">
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col w-full m-6"
            >
              <h1 className="text-3xl font-bold text-center">Enter Email Send</h1>
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email"
              />
              <button
                type="submit"
                className="p-2 mt-8 rounded-full bg-secondary hover:bg-primary"
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? "Sending..." : "Send Mail"}{" "}
              </button>
              {isError && (
                <div>
                  <span className="text-red-500">Error: </span>
                  {error.data.message}
                </div>
              )}
              {isSuccess && (
                <div>
                  <span className="text-green-500">Mail Sent Successfully </span>
                </div>
              )}
              <h4 className="text-sm mt-4">
                Want to create a account?
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

export default ForgotPassword;
