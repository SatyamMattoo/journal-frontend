import React from "react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { FaWindowClose } from "react-icons/fa";

import { useDeleteEditorMutation } from "../../store/api/authApi";

const DeleteEditor = ({ isOpen, setIsOpen, onClose, id, refresh }) => {
  const [deleteEditor, { isLoading, isSuccess, error }] =
    useDeleteEditorMutation();
  const handleDelete = async () => {
    try {
      const response = await deleteEditor(id);

      if (response.data) {
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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 overflow-scroll no-scrollbar" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[80vh] overflow-scroll no-scrollbar w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-30">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Do you want to delete this editor?
          </Dialog.Title>
          <Dialog.Description className="text-red-400 mt-[10px] text-[15px] leading-normal flex gap-4 mb-4">
            This action cannot be undone and can lead to problems if the
            reviewer was assigned any article.
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <button
              className="bg-primary text-white hover:bg-blue9 focus:shadow-blue7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes"}
            </button>
            <Dialog.Close>
              <button
                className="bg-red-400 text-white hover:bg-red-500 disabled:bg-gray-400 focus:shadow-red-100inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                disabled={isLoading}
              >
                No
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close
            asChild
            disabled={isLoading}
            className="text-primary hover:bg-blue3 focus:shadow-blue7 disabled:bg-gray-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          >
            <FaWindowClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteEditor;
