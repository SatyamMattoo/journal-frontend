import React from "react";
import Modal from "react-modal";
import { useSendArticleToAdminMutation } from "../../store/api/articleApi";
import toast from "react-hot-toast";

const SendArticle = ({ isOpen, onClose, refresh, id }) => {
  const [sendArticleToAdmin, { isLoading, isSuccess, error }] =
    useSendArticleToAdminMutation();

  const handleSubmit = async () => {
    try {
      const response = await sendArticleToAdmin(id);

      if (response.data) {
        toast.success(response.data.message);
        refresh();
        onClose();
      } else {
        toast.error(response.error.data.message);
        console.error("Failed to send article:", error);
      }
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-secondary bg-opacity-70 w-full min-h-screen z-40 flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl font-bold">
        Are you sure you want to send this article to admin for publication?
      </h2>
      <button
        onClick={handleSubmit}
        className="p-4 bg-secondary hover:bg-primary m-2 rounded-lg"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
      <button
        onClick={onClose}
        className="p-4 bg-secondary hover:bg-red-700 m-2 rounded-lg"
      >
        No
      </button>
    </Modal>
  );
};

export default SendArticle;
