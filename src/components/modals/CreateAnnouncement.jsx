import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useCreateAnnouncementMutation } from "../../store/api/articleApi";

const CreateAnnouncement = ({ onClose, isOpen, refresh }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [createAnnouncement, { isLoading }] = useCreateAnnouncementMutation();

  const handleCreate = async () => {
    try {
      const newAnnouncement = {
        title,
        description,
        url,
      };

      const response = await createAnnouncement(newAnnouncement);

      if (response.data) {
        toast.success("Announcement Created Successfully");
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
      <div className="flex -wull">
        <div className="flex flex-col justify-center p-2 items-center w-full">
          <h2 className="text-3xl font-body">Create New Announcement</h2>
          <div className="flex justify-start items-center w-full">
            <input
              required
              type="text"
              className="input w-full"
              placeholder="Enter Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-center w-full">
            <input
              type="text"
              className="input w-full"
              placeholder="Enter a link if needed"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-center w-full">
            <textarea
              required
              rows={3}
              type="email"
              className="input w-full"
              placeholder="Enter Announcement Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex">
            {" "}
            <button
              className="p-3 bg-secondary hover:bg-primary m-2 rounded-full"
              onClick={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
            <button
              className="p-3 bg-secondary hover:bg-red-500 m-2 rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAnnouncement;
