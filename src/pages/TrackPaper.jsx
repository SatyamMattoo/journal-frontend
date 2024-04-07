import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrStatusGood } from "react-icons/gr";

import { useGetArticleProgressMutation } from "../store/api/articleApi";

const TrackPaper = () => {
  const [id, setId] = useState("");
  const [progress, setProgress] = useState(0);
  const [getArticleProgress, { isError, isLoading, error }] = useGetArticleProgressMutation();

  const handleTrackClick = async () => {
    try {
      const response = await getArticleProgress({ id });
      if (response.data) {
        setProgress(calculateProgress(response.data.status));
        toast.success(`Artile Status: ${response.data.status}`);
      } else {
        toast.error(response.error.data.message);
      }
    } catch (err) {
      console.error(error);
      toast.error("Internal server error! Try again later.");
    }
  };

  const calculateProgress = (status) => {
    const progressMap = {
      submitted: 10,
      underreview: 25,
      resubmission: 45,
      readytopublish: 60,
      published: 80,
      certified: 100,
    };
    return progressMap[status] || 0;
  };

  return (
    <section className="h-screen m-5 flex justify-center items-center flex-col">
      <div className="container mx-auto flex justify-center items-center custom-shadow w-full md:w-1/3 rounded-lg">
        <div className="flex flex-col w-full p-4 gap-4">
          <GrStatusGood className="self-center w-8 h-8" />
          <h1 className="text-2xl font-bold text-center">Track your article's status</h1>
          <Input id={id} setId={setId} />
          <Button isLoading={isLoading} handleTrackClick={handleTrackClick} />
          {isError && (
            <div className="text-red-500">Problem fetching details. Please try later</div>
          )}
        </div>
      </div>
      <ProgressBar progress={progress} />
    </section>
  );
};

const Input = ({ id, setId }) => (
  <input
    type="text"
    required
    className="w-full self-center grow shrink-0 rounded px-2.5 py-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
    placeholder="Enter the Id sent to your email"
    value={id}
    onChange={(e) => setId(e.target.value)}
  />
);

const Button = ({ isLoading, handleTrackClick }) => (
  <button
    onClick={handleTrackClick}
    className="w-1/4 self-end p-2 rounded-lg bg-primary hover:bg-blue9 text-white disabled:bg-gray-400 transition-all ease-in-out duration-500"
    disabled={isLoading}
  >
    {isLoading ? "Tracking..." : "Track"}
  </button>
);

const ProgressBar = ({ progress }) => (
  <div className="my-10 flex justify-center items-center custom-shadow w-full md:w-3/4 rounded-lg">
    <div className="flex flex-col w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Progress Bar</h2>

      <div className="w-full bg-white h-4 rounded-full relative border border-slate-500">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-primary rounded-full transition-all duration-500"
        ></div>
      </div>

      <ProgressLabels />
    </div>
  </div>
);

const ProgressLabels = () => (
  <div className="flex text-xs md:text-base justify-between mt-4 overflow-scroll no-scrollbar">
    {[
      { label: "Submitted", color: "gray-500" },
      { label: "Under Review", color: "yellow-400" },
      { label: "Resubmission", color: "red-500" },
      { label: "Ready to Publish", color: "yellow-700" },
      { label: "Published", color: "purple-900" },
      { label: "Certified", color: "green-500" },
    ].map(({ label, color }) => (
      <span key={label} className={`text-${color} text-center opacity-90 mx-1`}>
        {label}
      </span>
    ))}
  </div>
);

export default TrackPaper;