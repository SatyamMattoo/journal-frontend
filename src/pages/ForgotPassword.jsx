import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSendResetMailMutation } from "../store/api/authApi";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [sendResetMail, { data, isLoading, isError, isSuccess, error }] =
    useSendResetMailMutation();

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
    <section className="h-screen mt-32 flex items-center flex-col">
      <div className=" mx-auto flex justify-center items-center custom-shadow w-full lg:w-1/4 rounded-lg">
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col w-full m-6 gap-4"
        >
          <h1 className="text-3xl text-center text-tertiary font-semibold">
            Enter Email Send
          </h1>
          <input
            type="email"
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Your Email"
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-primary hover:bg-blue9 text-white"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Sending..." : "Send Mail"}{" "}
          </button>
          {isError && (
            <div>
              <span className="text-red-500">Error: {error.data.message}</span>
            </div>
          )}
          {isSuccess && (
            <div>
              <span className="text-green-500">Mail Sent Successfully </span>
            </div>
          )}
          <h4 className="text-sm text-gray-600">
            Want to Sign Up/In?
            <Link to="/auth" className="text-primary hover:text-blue9">
              {" "}
              Click Here.
            </Link>
          </h4>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
