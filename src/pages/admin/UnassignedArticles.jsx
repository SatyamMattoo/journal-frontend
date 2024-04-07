import React, { useEffect, useState } from "react";

import Table from "../../components/Table";
import AssignArticle from "../../components/modals/AssignArticle";
import { FaArrowAltCircleRight } from "react-icons/fa";
import {
  useGetEditorsQuery,
  useGetSubmittedArticlesQuery,
} from "../../store/api/articleApi";
import Loader from "../../components/Loader";

const UnassignedArticles = () => {
  const [editors, setEditors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortedArticles, setSortedArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const {
    data: editorData,
    isSuccess: editorSuccess,
    isLoading: editorLoading,
  } = useGetEditorsQuery();

  const {
    data: articleData,
    isSuccess: articleSuccess,
    isLoading: articleLoading,
    refetch: refetchArticles,
  } = useGetSubmittedArticlesQuery();

  useEffect(() => {
    if (editorSuccess) {
      setEditors(editorData.editors || []);
    }
  }, [editorData, editorSuccess]);

  useEffect(() => {
    if (articleSuccess) {
      const unsortedArticles = articleData.articles || [];
      const sortedArticles = [...unsortedArticles].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedArticles(sortedArticles);
    }
  }, [articleData, articleSuccess]);

  if (articleLoading || editorLoading) return <Loader />;

  const handleAssignClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const adminUnassignedArticleColumn = [
    {
      accessorKey: "title",
      header: () => "Title",
    },
    {
      accessorKey: "name",
      header: () => "Author Name",
      cell: (info) => info.row.original.author.name || "",
    },
    {
      accessorKey: "email",
      header: () => "Author Email",
      cell: (info) => info.row.original.author.email || "",
    },
    {
      accessorKey: "createdAt",
      header: "Submitted On",
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
      accessorKey: "assign",
      header: "Assign Editor",
      enableColumnFilter: false,
      cell: (info) => {
        const article = info.row.original;
        return (
          <button
            onClick={() => handleAssignClick(article)}
            className="p-2 rounded-lg ml-4 text-white bg-green-500/80 hover:bg-green-500 disabled:bg-gray-400 transition-all ease-in-out duration-500"
          >
            Assign
          </button>
        );
      },
    },
  ];

  const Header = () => {
    return (
      <div className="flex w-full bg-gray-100 text-xl font-semibold justify-between items-center p-4 rounded-t-lg">
        <div className="flex">
          <p className="text-primary">Unassigned Articles</p>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {sortedArticles.length > 0 ? (
        <Table
          children={<Header />}
          emptyMessage="No articles submitted yet."
          tableData={sortedArticles}
          columns={adminUnassignedArticleColumn}
        />
      ) : (
        <div className="p-4 m-2 custom-shadow">
          <h1 className="text-3xl text-gray-600">No Articles Published.</h1>
        </div>
      )}
      <AssignArticle
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        editors={editors}
        articleId={selectedArticle ? selectedArticle._id : null}
        refresh={refetchArticles}
      />
    </div>
  );
};

export default UnassignedArticles;
