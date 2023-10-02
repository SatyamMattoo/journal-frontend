import React, { useState } from "react";
import Modal from "react-modal";
import { useCreateEditorMutation } from "../../store/api/authApi";
import toast from "react-hot-toast";

const CreateEditor = ({ onClose, isOpen, refresh }) => {
  const [createEditor, { isLoading }] = useCreateEditorMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async () => {
    try {
      const newEditor = {
        name,
        email,
        department,
        password,
      };

      const response = await createEditor(newEditor);

      if (response.data) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setDepartment("");
        setPassword("");
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
      <div className="editor-form">
        <h2 className="text-3xl font-body">Create New Editor</h2>
        <div>
          <label>Name:</label>
          <input
            required
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            required
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            required
            type="text"
            className="input"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            required
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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
    </Modal>
  );
};

export default CreateEditor;
