import React, { useState } from "react";
import { useSubmitArticleMutation } from "../store/api/articleApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";

const Submission = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { register, handleSubmit } = useForm();

  const [submitArticle, { isLoading, isError, error }] =
    useSubmitArticleMutation();

  if (isError) {
    console.log(error);
  }
  const onSubmit = async (data) => {
    try {
      // Create a new FormData instance
      const formDataInstance = new FormData();
      formDataInstance.append("title", title);
      formDataInstance.append("description", description);
      formDataInstance.append("pdfFile", data.pdfFile[0]);

      const response = await submitArticle(formDataInstance);

      if (response.data) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
      } else {
        toast.error("Problem submitting article");
        console.error("Problem submitting article:", response.error);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      toast.error("Problem submitting article");
      console.error("Error submitting article:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="h-screen m-5 flex justify-center items-center flex-col">
          <div className="conatiner mx-auto flex justify-center items-center card-gradient w-full md:w-1/2 rounded-lg">
            <form
              className="flex flex-col justify-between items-center w-full m-6"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <h1 className="text-3xl mb-10 font-bold text-center">
                Submit Your Article
              </h1>
              <input
                type="text"
                required
                className="input w-[80%]"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your article"
              />
              <textarea
                rows={3}
                type="text"
                required
                className="input w-[80%]"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a short description"
              />
              <input
                type="file"
                {...register("pdfFile")}
                required
                className="input w-[80%]"
                name="pdfFile"
                accept=".pdf"
              />
              <button
                type="submit"
                className=" p-2 w-3/4 mt-8 self-center rounded-full bg-secondary hover:bg-primary "
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Submission;
