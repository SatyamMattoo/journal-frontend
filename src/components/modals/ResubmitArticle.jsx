import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useSendForResubmissionMutation } from "../../store/api/articleApi";

const ResubmitArticle = ({ isOpen, onClose, refresh, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [sendForResubmission, { isLoading }] = useSendForResubmissionMutation();

  const handleSubmit = async () => {
    try {
      const data = {
        id,
        title,
        description,
      };

      const response = await sendForResubmission(data);

      if (response.data) {
        toast.success(response.data.message);
        setTitle("");
        setDescription("");
        refresh();
        onClose();
      } else {
        toast.error(response.error.data.message);
        console.error("Failed to create editor:", response.error);
      }
    } catch (error) {
      console.error("Error creating editor:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-secondary bg-opacity-70 w-full min-h-screen z-40 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Send For Resubmission</h2>
        <input
          required
          type="text"
          name="title"
          placeholder="Enter the issue title"
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          rows={3}
          type="text"
          name="description"
          placeholder="Enter the issue description"
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex">
          {" "}
          <button
            onClick={handleSubmit}
            className="p-3 bg-primary hover:blue9 my-1 mx-3 rounded-lg"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
          <button
            onClick={onClose}
            className="p-3 bg-secondary hover:bg-red-700 my-1 mx-3 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResubmitArticle;
