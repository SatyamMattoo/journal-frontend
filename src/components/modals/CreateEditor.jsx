import React, { useState } from "react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

import { useCreateEditorMutation } from "../../store/api/authApi";
import { FaWindowClose } from "react-icons/fa";

const CreateEditor = ({ onClose, isOpen, setIsOpen, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });
  const [createEditor, { isLoading }] = useCreateEditorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await createEditor(formData);

      if (response.data) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          department: "",
          password: "",
        });
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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 overflow-scroll no-scrollbar" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[80vh] overflow-scroll no-scrollbar w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-30">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Enter the announcement deails.
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] text-[15px] leading-normal mb-4">
            Enter the following details in order to create a new announcement
          </Dialog.Description>
          <form onSubmit={handleCreate}>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-blue12 block"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                type="text"
                name="email"
                placeholder="Enter the email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-blue12 block"
                htmlFor="name"
              >
                Name*
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                type="text"
                name="name"
                placeholder="Enter the name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-blue12 block"
                htmlFor="department"
              >
                Department*
              </label>
              <input
                className="grow shrink-0 p-2 rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                type="text"
                name="department"
                placeholder="Enter the department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
              <label
                className="text-[13px] leading-none mb-2.5 text-blue12 block"
                htmlFor="password"
              >
                Password*
              </label>
              <input
                className="grow shrink-0 rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-blue8 outline-none"
                type="password"
                name="password"
                placeholder="Enter the password"
                value={formData.password}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="flex justify-end">
              <button
                className="bg-primary text-white hover:bg-blue9 disabled:bg-gray-400 focus:shadow-blue7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </fieldset>
          </form>
          <Dialog.Close
            asChild
            type="button"
            onClick={onClose}
            className="text-primary hover:bg-blue3 focus:shadow-blue7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none cursor-pointer"
          >
            <FaWindowClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEditor;
