import React, { useState } from "react";
import { useGetArticleProgressMutation } from "../store/api/articleApi";
import toast from "react-hot-toast";

const TrackPaper = () => {
  const [progress, setProgress] = useState(0);
  const [id, setId] = useState("");

  const [getArticleProgress, { isError, isLoading, error }] =
    useGetArticleProgressMutation();

  const handleTrackClick = async () => {
    try {
      const data = { id };

      const response = await getArticleProgress(data);
      // Assuming the API response contains data.status
      if (response.data) {
        setProgress(calculateProgress(response.data.status));
        toast.success(`Artile Status: ${response.data.status}`);
      } else {
        toast.error("Invalid Id or you are not the author");
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const calculateProgress = (status) => {
    switch (status) {
      case "submitted":
        return 10;
      case "underreview":
        return 25;
      case "resubmission":
        return 45;
      case "readytopublish":
        return 60;
      case "published":
        return 80;
      case "certified":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <section className="h-screen m-5 flex justify-center items-center flex-col">
      <div className="conatiner mx-auto flex justify-center items-center custom-shadow w-full md:w-1/2 rounded-lg">
        <div className="flex flex-col w-full m-6">
          <h1 className="text-3xl font-bold text-center text-primary mb-4">
            Track your article's status
          </h1>
          <input
            type="text"
            required
            className="w-full md:w-3/4 self-center grow shrink-0 rounded px-2.5 py-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
            placeholder="Enter the Id sent to your email"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={handleTrackClick}
            className={`w-1/2 self-center p-2 mt-8 rounded-full ${
              isLoading ? "bg-gray-500" : "bg-primary hover:bg-blue9"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Tracking..." : "Track"}
          </button>
          {isError ? (
            <div className="text-red-500">
              Problem fetching details. Please try later
            </div>
          ) : null}
        </div>
      </div>
      <div className="my-10 flex justify-center items-center custom-shadow w-full md:w-3/4 rounded-lg">
        <div className="flex flex-col w-full p-4">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Progress Bar</h2>

          <div className="w-full bg-white h-4 rounded-full relative">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full transition-all duration-500"
            ></div>
          </div>

          <div className="flex text-xs md:text-base justify-between mt-4">
            <span className="text-gray-500  text-center opacity-90 mx-1">
              Submitted
            </span>
            <span className="text-yellow-400 text-center opacity-90 mx-1">
              Under Review
            </span>
            <span className="text-red-500  text-center opacity-90 mx-1">
              Resubmission
            </span>
            <span className="text-yellow-700 text-center opacity-90 mx-1">
              Ready to Publish
            </span>
            <span className="text-purple-900 text-center opacity-90 mx-1">
              Published
            </span>
            <span className="hidden md:block text-green-500 text-center opacity-90 mx-1">
              Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackPaper;
