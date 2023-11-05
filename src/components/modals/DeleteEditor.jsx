import React from "react";
import Modal from "react-modal";
import { useDeleteEditorMutation } from "../../store/api/authApi";
import toast from "react-hot-toast";

const DeleteEditor = ({ isOpen, onClose, id, refresh }) => {
  const [deleteEditor, { isLoading, isSuccess, error }] =
    useDeleteEditorMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteEditor(id);

      if (response.data.success === true) {
        toast.success(response.data.message);
        refresh();
        onClose();
      } else {
        toast.error(response.error.data.message);
        console.error("Failed to delete editor:", error);
      }
    } catch (error) {
      console.error("Error deleting editor:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-secondary bg-opacity-70 w-full min-h-screen z-40 flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl font-bold">
        Are you sure you want to delete this Editor ?
      </h2>
      <button
        onClick={handleDelete}
        className="p-4 bg-primary hover:blue9 m-2 rounded-lg"
      >
       {isLoading?"Deleting..." :"Delete"}
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

export default DeleteEditor;
