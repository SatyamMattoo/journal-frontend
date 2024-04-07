import toast from "react-hot-toast";
import React, { useState } from "react";
import { GoCheckbox } from "react-icons/go";
import { FaWindowClose } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import Table from "../Table";
import { useAssignArticleMutation } from "../../store/api/articleApi";

const AsignArticle = ({
  isOpen,
  setIsOpen,
  onClose,
  articleId,
  editors,
  refresh,
}) => {
  const [assignArticle, { isLoading: isAssigningArticle }] =
    useAssignArticleMutation("assignArticle");
  const [selectedEditor, setSelectedEditor] = useState(null);

  const editorsColumns = [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Department", accessorKey: "department" },
    {
      header: "Select",
      accessorKey: "selectEditor",
      enableColumnFilter: false,
      cell: (info) => {
        const editor = info.row.original;
        return (
          <button
            onClick={() => setSelectedEditor(editor)}
            className={`text-primary rounded py-1 px-2 cursor-pointer`}
          >
            {selectedEditor?._id === editor._id ? (
              <GoCheckbox />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )}
          </button>
        );
      },
    },
  ];

  const handleAssignArticle = async () => {
    try {
      if (!selectedEditor) {
        toast.error("Please select an editor to assign the article.");
        return;
      }

      const data = { articleId, editorId: selectedEditor._id };
      const response = await assignArticle(data);
      if (response.data) {
        toast.success(response.data.message);
        refresh();
        onClose();
        setIsOpen(false);
        setSelectedEditor(null);
      } else {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Problem assigning article : Already Assigned or Invalid Editor"
      );
      console.error("Error assigning article:", error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 overflow-scroll no-scrollbar " />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[80vh] overflow-scroll no-scrollbar w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-40%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-40">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Select the editor
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] text-[15px] leading-normal">
            Select the editor and save to assign the article to a given editor
          </Dialog.Description>
          <Table
            columns={editorsColumns}
            tableData={editors}
            bottomView={false}
          />
          <div className="flex justify-end">
            <button
              className="bg-primary text-white hover:bg-blue9 disabled:bg-gray-400 focus:shadow-blue7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              onClick={handleAssignArticle}
              disabled={isAssigningArticle}
            >
              {isAssigningArticle ? "Assigning..." : "Assign Editor"}
            </button>
          </div>
          <Dialog.Close
            asChild
            className="text-primary hover:bg-blue3 focus:shadow-blue7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          >
            <FaWindowClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AsignArticle;
