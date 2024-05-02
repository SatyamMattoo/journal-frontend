import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Loader from "../../components/Loader";
import Table from "../../components/Table";
import { useGetUnderreviewArticlesQuery } from "../../store/api/articleApi";

const UnderreviewArticles = () => {
  const [sortedArticles, setSortedArticles] = React.useState([]);
  const { data, isSuccess, isLoading } = useGetUnderreviewArticlesQuery();

  React.useEffect(() => {
    if (isSuccess) {
      const unsortedArticles = data.articles || [];
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
      header: () => "Title",
    },
    {
      accessorKey: "authorEmail",
      header: () => "Author Email",
      cell: (info) => info.row.original.author.email || "",
      accessorFn: (data) => data.author.email,
    },
    {
      accessorKey: "editorName",
      header: () => "Editor Name",
      cell: (info) => info.row.original.editor.name || "",
      accessorFn: (data) => data.editor.name,
    },
    {
      accessorKey: "editorEmail",
      header: () => "Editor Email",
      cell: (info) => info.row.original.editor.email || "",
      accessorFn: (data) => data.editor.email,
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => info.getValue().toUpperCase(),
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
  ];

  const Header = () => {
    return (
      <div className="flex w-full bg-gray-100 text-xl font-semibold justify-between items-center p-4 rounded-t-lg">
        <div className="flex">
          <p className="text-primary">Articles Under Review</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        children={<Header />}
        emptyMessage="No articles under review."
        tableData={sortedArticles}
        columns={editorAssignedArticleColumn}
      />
    </div>
  );
};

export default UnderreviewArticles;
