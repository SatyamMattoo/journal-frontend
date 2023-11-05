import React from "react";
import Modal from "react-modal";
import { usePublishArticleMutation } from "../../store/api/articleApi";
import toast from "react-hot-toast";

const PublishArticle = ({ isOpen, onClose, id, refresh }) => {
  const [publishArticle, { isLoading, isSuccess, error }] =
    usePublishArticleMutation();

  const handleDelete = async () => {
    try {
      const response = await publishArticle(id);

      if (response.data) {
        toast.success(response.data.message);
        refresh();
        onClose();
      } else {
        toast.error(response.error.data.message);
        console.error("Failed to publish article:", error);
      }
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-secondary bg-opacity-70 w-full h-full z-40 flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl font-bold">
        Are you sure you want to publish this article ?
      </h2>
      <button
        onClick={handleDelete}
        className="h-[30px] w-[80px] bg-primary hover:blue9 m-2 rounded-lg"
      >
        {isLoading ? "Publishing..." : "Publish"}
      </button>
      <button
        onClick={onClose}
        className="h-[30px] w-[80px] bg-secondary hover:bg-red-700 m-2 rounded-lg"
      >
        Close
      </button>
    </Modal>
  );
};

export default PublishArticle;
