import React from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useAssignArticleMutation } from "../../store/api/articleApi";

const AsignArticle = ({ isOpen, onClose, articleId, editors, refresh }) => {
  const [assignArticle, { isLoading: isAssigningArticle }] =
    useAssignArticleMutation("assignArticle");

  const handleAssignArticle = async (editorId) => {
    try {
      const data = { articleId, editorId };
      // Call the assignArticle mutation to assign the article to the selected editor
      const response = await assignArticle(data);

      if (response.data) {
        // Article assigned successfully
        toast.success(response.data.message);
        refresh();
        onClose();
      } else {
        // Handle error, e.g., display an error message
        toast.error(
          "Problem assigning article : Already Assigned or Invalid Editor"
        );
        console.error("Failed to assign article:", response.error);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error assigning article:", error);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="bg-secondary bg-opacity-70 w-full min-h-screen z-40 flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold">Select an Editor</h2>
        <ul>
          {editors.map((editor, index) => (
            <div key={index}>
              {editor.name}
              <button
                onClick={() => handleAssignArticle(editor._id)}
                className="p-2 bg-secondary hover:bg-primary m-2 rounded-full"
                disabled={isAssigningArticle}
              >
                {isAssigningArticle ? "Assigning..." : "Assign"}
              </button>
            </div>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="p-2 bg-secondary hover:bg-red-700 m-2 rounded-full"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default AsignArticle;
