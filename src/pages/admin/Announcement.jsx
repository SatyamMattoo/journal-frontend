import React from "react";

import Table from "../../components/Table";
import { MdDelete } from "react-icons/md";
import DeleteEditor from "../../components/modals/DeleteEditor";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useGetAnnouncementQuery } from "../../store/api/articleApi";
import { BsPlus } from "react-icons/bs";
import CreateAnnouncement from "../../components/modals/CreateAnnouncement";
import DeleteAnnouncement from "../../components/modals/DeleteAnnouncement";

const Announcements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [createModal, setCreateModal] = React.useState(false);

  const { data, isSuccess, refetch } = useGetAnnouncementQuery();

  let announcement = [];
  if (isSuccess) {
    announcement = data.announcements || [];
  }

  const adminAnnouncementColumn = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      accessorKey: "url",
      header: "Link",
      enableColumnFilter: false,
      cell: (info) => {
        return (
          <a
            rel="stylesheet"
            href={info.getValue()}
            target="_blank"
            className="flex items-center gap-2 text-primary"
          >
            View <FaArrowAltCircleRight />
          </a>
        );
      },
    },
    {
      header: "Delete",
      accessorKey: "action",
      enableColumnFilter: false,
      cell: (info) => {
        const announcement = info.row.original;
        return (
          <button
            onClick={() => {
              setDeleteModal(true);
              setSelectedAnnouncement(announcement);
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
      <div className="flex w-full bg-gray-100 text-xl font-semibold justify-between items-center p-4 rounded-t-lg">
        <div className="flex">
          <p className="text-primary">Announcements</p>
        </div>
        <button
          className="bg-primary/90 hover:bg-primary p-1 text-white text-base rounded-lg"
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
        emptyMessage="No announcements created. Create one with the button on the top right of the table"
        tableName={"Announcements"}
        tableData={announcement}
        columns={adminAnnouncementColumn}
      />
      <CreateAnnouncement
        isOpen={createModal}
        setIsOpen={setCreateModal}
        onClose={() => setCreateModal(false)}
        refresh={refetch}
      />
      <DeleteAnnouncement
        isOpen={deleteModal}
        id={selectedAnnouncement._id}
        setIsOpen={setDeleteModal}
        onClose={() => setDeleteModal(false)}
        refresh={refetch}
      />
    </div>
  );
};

export default Announcements;
