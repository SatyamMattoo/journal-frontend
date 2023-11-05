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
      <form onSubmit={handleCreate}>
        <div className="editor-form flex gap-4 flex-col">
          <h2 className="text-3xl font-body">Create New Editor</h2>

          <div className="flex justify-between gap-2 items-center">
            <label>Name:</label>
            <input
              required
              type="text"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label>Email:</label>
            <input
              required
              type="email"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label>Department:</label>
            <input
              required
              type="text"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-2 items-center">
            <label>Password:</label>
            <input
              required
              type="password"
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue11 shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="p-3 bg-primary hover:blue9 m-2 rounded-full"
              type="submit"
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
      </form>
    </Modal>
  );
};

export default CreateEditor;
