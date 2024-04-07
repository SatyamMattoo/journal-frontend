import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

import Loader from "../../components/Loader";
import Table from "../../components/Table";
import { useGetPreviousArticlesQuery } from "../../store/api/articleApi";

const PreviousArticles = () => {
  const [sortedArticles, setSortedArticles] = React.useState([]);

  const { data, isSuccess, isLoading } = useGetPreviousArticlesQuery();
  console.log(data);

  React.useEffect(() => {
    if (isSuccess) {
      const unsortedArticles = data.previousArticles || [];
      console.log(unsortedArticles);
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
      accessorKey: "description",
      header: () => "Description",
      cell: (info) =>
        info.getValue().length > 30
          ? info.getValue().substring(0, 27) + "..."
          : info.getValue(),
      enableColumnFilter: false,
      enableSorting: false,
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
          <p className="text-primary">Reviewed Articles</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        children={<Header />}
        emptyMessage="No articles reviewed yet."
        tableData={sortedArticles}
        columns={editorAssignedArticleColumn}
      />
    </div>
  );
};

export default PreviousArticles;
