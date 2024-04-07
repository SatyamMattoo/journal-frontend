import React from "react";
import { BsPlus } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import Table from "../../components/Table";
import Loader from "../../components/Loader";
import DeleteEditor from "../../components/modals/DeleteEditor";
import { useGetEditorsQuery } from "../../store/api/articleApi";
import CreateEditor from "../../components/modals/CreateEditor";

const Editors = () => {
  const [selectedEditor, setSelectedEditor] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [createModal, setCreateModal] = React.useState(false);

  const {
    data: editorData,
    isSuccess: editorSuccess,
    isLoading: editorLoading,
    refetch,
  } = useGetEditorsQuery();

  if (editorLoading) return <Loader />;

  let editors = editorSuccess ? editorData.editors : [];

  const adminEditorColumn = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Department",
      accessorKey: "department",
    },
    {
      header: "Delete",
      accessorKey: "action",
      enableColumnFilter: false,
      cell: (info) => {
        const editor = info.row.original;
        return (
          <button
            onClick={() => {
              setDeleteModal(true);
              setSelectedEditor(editor);
            }}
            className="p-2 rounded-lg ml-4 text-white bg-red-500/80 hover:bg-red-500 disabled:bg-gray-400 transition-all ease-in-out duration-500"
          >
            <MdDelete />
          </button>
        );
      },
    },
  ];

  const Header = () => {
    return (
      <div className="flex w-full bg-gray-100 text-2xl font-semibold justify-between items-center p-4 rounded-t-lg">
        <div className="flex">
          <p className="text-primary">Editors</p>
        </div>
        <button
          className="bg-primary/90 hover:bg-primary p-2 text-white text-base rounded-lg"
          onClick={() => setCreateModal(true)}
        >
          <BsPlus className="w-6 h-6" />
        </button>
      </div>
    );
  };

  return (
    <div>
      <Table
        children={<Header />}
        emptyMessage="No reviewers created. Create one with the button on the top right of the table"
        tableName={"Editors"}
        tableData={editors}
        columns={adminEditorColumn}
      />
      <DeleteEditor
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        onClose={() => setDeleteModal(false)}
        id={selectedEditor ? selectedEditor._id : null}
        refresh={refetch}
      />
      <CreateEditor
        isOpen={createModal}
        setIsOpen={setCreateModal}
        onClose={() => setCreateModal(false)}
        refresh={refetch}
      />
    </div>
  );
};

export default Editors;
