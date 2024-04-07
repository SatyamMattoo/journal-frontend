import React from "react";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

import { usePublishArticleMutation } from "../../store/api/articleApi";
import { FaWindowClose } from "react-icons/fa";

const PublishArticle = ({ isOpen, setIsOpen, onClose, articleId, refresh }) => {
  const [publishArticle, { isLoading }] = usePublishArticleMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await publishArticle(articleId);

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
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 overflow-scroll no-scrollbar" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[80vh] overflow-scroll no-scrollbar w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-30">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Do you want to publish this article?
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] text-[15px] leading-normal mb-4">
            The article will be published on the home page and added to the
            volume accordingly.
          </Dialog.Description>
          <div className="flex justify-end gap-2">
            <button
              className="bg-primary text-white hover:bg-blue9 disabled:bg-gray-400 focus:shadow-blue7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Yes"}
            </button>
            <Dialog.Close className="bg-red-400 text-white hover:bg-red-500 disabled:bg-gray-400 focus:shadow-red-100inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              No
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary hover:bg-blue3 focus:shadow-blue7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <FaWindowClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PublishArticle;
