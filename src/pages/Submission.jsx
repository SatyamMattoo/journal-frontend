import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { MdOutlineArticle } from "react-icons/md";

import { useSubmitArticleMutation } from "../store/api/articleApi";

const Submission = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitArticle, { isLoading, isError }] = useSubmitArticleMutation();

  const onSubmit = async (data) => {
    try {
      // Create a new FormData instance
      const formDataInstance = new FormData();
      formDataInstance.append("title", data.title);
      formDataInstance.append("description", data.description);
      formDataInstance.append("pdfFile", data.pdfFile[0]);

      const response = await submitArticle(formDataInstance);

      if (response.data) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      toast.error("Problem submitting article");
      console.error("Error submitting article:", error);
    }
  };

  return (
    <section className="h-screen flex items-center flex-col mt-20">
      <div className="container mx-auto flex justify-center items-center custom-shadow w-full md:w-1/3 rounded-lg">
        <form
          className="flex flex-col justify-center items-center w-full p-4 md:p-8 gap-4"
          onSubmit={handleSubmit(onSubmit)}
          // encType="multipart/form-data"
        >
          <h1 className="text-2xl text-center text-tertiary font-semibold flex gap-2 items-center">
            <MdOutlineArticle className="w-8 h-8" />
            Submit Your Article
          </h1>
          <label
            htmlFor="title"
            className="flex flex-col text-sm font-semibold gap-1 w-full"
          >
            Title
            <input
              type="text"
              required
              className="grow font-normal shrink-0 rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              name="title"
              {...register("title")}
              placeholder="Enter a title for your article"
            />
          </label>
          <label
            htmlFor="description"
            className="flex flex-col text-sm font-semibold gap-1 w-full"
          >
            Description
            <textarea
              rows={4}
              required
              className="font-normal grow shrink-0 rounded px-2.5 py-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              name="description"
              {...register("description")}
              placeholder="Enter a short description (50 characters)"
            />
          </label>
          <input
            type="file"
            {...register("pdfFile")}
            required
            className="w-full grow shrink-0 rounded px-2.5 text-[15px] leading-none"
            name="pdfFile"
            accept=".doc,.docx,.pdf"
          />
          <button
            type="submit"
            className="p-2 w-1/2 lg:w-1/4 self-end rounded-lg text-white bg-primary hover:bg-blue9 disabled:bg-gray-400 transition-all ease-in-out duration-500"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Submission;
