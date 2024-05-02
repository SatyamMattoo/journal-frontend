import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Table from "../../components/Table";
import PublishArticle from "../../components/modals/PublishArticle";
import AssignArticle from "../../components/modals/AssignArticle";
import {
  useGetEditorsQuery,
  useGetReadyToPublishArticlesQuery,
} from "../../store/api/articleApi";
import Loader from "../../components/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";

const PushblishedArticles = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reassignModal, setReassignModal] = React.useState(false);
  const [selectedArticle, setSelectedArticle] = React.useState(false);
  const [sortedArticles, setSortedArticles] = React.useState([]);

  const {
    data: editorData,
    isSuccess: editorSuccess,
    isLoading: editorLoading,
  } = useGetEditorsQuery();
  const {
    data: articleData,
    isSuccess: articleSuccess,
    refetch: refetchArticles,
  } = useGetReadyToPublishArticlesQuery();

  if (editorLoading) return <Loader />;

  let editors = editorSuccess ? editorData.editors : [];

  const adminUnassignedArticleColumn = [
    {
      accessorKey: "title",
      header: () => "Title",
    },
    {
      accessorKey: "name",
      header: () => "Author Name",
      cell: (info) => info.row.original.author.name || "",
      accessorFn: (data) => data.author.name,
    },
    {
      accessorKey: "email",
      header: () => "Author Email",
      cell: (info) => info.row.original.author.email || "",
      accessorFn: (data) => data.author.email,
    },
    {
      accessorKey: "createdAt",
      header: "Reviewed On",
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
      accessorKey: "publishArticle",
      header: "Publish",
      enableColumnFilter: false,
      cell: (info) => {
        const article = info.row.original;
        return (
          <ActionDropdown
            onPublish={() => {
              setIsModalOpen(true);
              setSelectedArticle(article);
            }}
            onResubmit={() => {
              setReassignModal(true);
              setSelectedArticle(article);
            }}
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    if (articleSuccess) {
      const unsortedArticles = articleData.articles || [];
      const sortedArticles = [...unsortedArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedArticles(sortedArticles);
    }
  }, [articleSuccess, articleData]);

  const Header = () => {
    return (
      <div className="flex w-full bg-gray-100 text-xl font-semibold justify-between items-center p-4 rounded-t-lg">
        <div className="flex">
          <p className="text-primary">Reviewed Articles</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        children={<Header />}
        emptyMessage="No articles sent to publish by any editor yet."
        tableName={"Reviewed by editor and ready to publish articles"}
        tableData={sortedArticles}
        columns={adminUnassignedArticleColumn}
      />
      <PublishArticle
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        articleId={selectedArticle ? selectedArticle._id : null}
        refresh={refetchArticles}
      />
      <AssignArticle
        isOpen={reassignModal}
        editors={editors}
        setIsOpen={setReassignModal}
        onClose={() => setReassignModal(false)}
        articleId={selectedArticle ? selectedArticle._id : null}
        refresh={refetchArticles}
      />
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

export default PushblishedArticles;
