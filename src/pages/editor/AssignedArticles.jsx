import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

import Loader from "../../components/Loader";
import Table from "../../components/Table";
import { useGetAssignedArticlesQuery } from "../../store/api/articleApi";
import SendArticle from "../../components/modals/SendArticle";
import ResubmitArticle from "../../components/modals/ResubmitArticle";

const AssignedArticles = () => {
  const [sortedArticles, setSortedArticles] = React.useState([]);
  const [selectedArticle, setSelectedArticle] = React.useState(null);
  const [resubmitModal, setResubmitModal] = React.useState(false);
  const [publishModal, setPublishModal] = React.useState(false);

  const { data, isSuccess, isLoading, refetch } = useGetAssignedArticlesQuery();

  React.useEffect(() => {
    if (isSuccess) {
      const unsortedArticles = data.assignedArticles || [];
      const sorted = [...unsortedArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedArticles(sorted);
    }
  }, [data, isSuccess]);

  if (isLoading) return <Loader />;

  const editorAssignedArticleColumn = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) =>
        info.getValue().length > 30
          ? info.getValue().substring(0, 27) + "..."
          : info.getValue(),
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Author Name",
      cell: (info) => info.row.original.author.name || "",
    },
    {
      accessorKey: "email",
      header: "Author Email",
      cell: (info) => info.row.original.author.email || "",
    },
    {
      accessorKey: "createdAt",
      header: "Assigned On",
      cell: (info) => {
        const date = new Date(info.getValue());
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
      },
    },
    {
      accessorKey: "pdfFile",
      header: "PDF",
      enableColumnFilter: false,
      cell: (info) => (
        <a
          rel="stylesheet"
          href={info.getValue()}
          target="_blank"
          className="flex items-center gap-2 text-primary"
        >
          View <FaArrowAltCircleRight />
        </a>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableColumnFilter: false,
      cell: (info) => (
        <ActionDropdown
          onPublish={() => {
            setPublishModal(true);
            setSelectedArticle(info.row.original);
          }}
          onResubmit={() => {
            setResubmitModal(true);
            setSelectedArticle(info.row.original);
          }}
        />
      ),
    },
  ];

  const Header = () => (
    <div className="flex w-full bg-gray-100 text-xl font-semibold justify-between items-center p-4 rounded-t-lg">
      <div className="flex">
        <p className="text-primary">Assigned Articles</p>
      </div>
    </div>
  );

  return (
    <div>
      <Table
        children={<Header />}
        emptyMessage="No articles assigned yet."
        tableData={sortedArticles}
        columns={editorAssignedArticleColumn}
      />
      {selectedArticle && (
        <>
          <SendArticle
            isOpen={publishModal}
            setIsOpen={setPublishModal}
            onClose={() => setPublishModal(false)}
            id={selectedArticle._id}
            refresh={refetch}
          />
          <ResubmitArticle
            isOpen={resubmitModal}
            setIsOpen={setResubmitModal}
            onClose={() => setResubmitModal(false)}
            id={selectedArticle._id}
            refresh={refetch}
          />
        </>
      )}
    </div>
  );
};

const ActionDropdown = ({ onPublish, onResubmit }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-primary"
        aria-label="Customise options"
      >
        <BsThreeDotsVertical />
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
        <DropdownMenu.Item className="group text-[15px] leading-none text-blue11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[20px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue9 data-[highlighted]:text-violet1">
          <button onClick={onPublish}>Send to Publish</button>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="group text-[15px] leading-none text-blue11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[20px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue9 data-[highlighted]:text-violet1">
          <button onClick={onResubmit}>Resubmission</button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default AssignedArticles;
