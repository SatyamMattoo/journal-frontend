import React from "react";
import { MdOutlineArticle } from "react-icons/md";

import Table from "../components/Table";
import { archivesColumns } from "../utils/columns";
import { useGetPublishedArticlesQuery } from "../store/api/articleApi";
import TableSkeleton from "../components/TableSkeleton";

const Archives = () => {
  const { data, isError, isLoading, isSuccess } =
    useGetPublishedArticlesQuery();

  let articles = [],
    sortedArticles = [];
  if (isSuccess) {
    articles = data.articles || [];
    sortedArticles = [...(articles || [])];
    sortedArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <section className="min-h-screen m-5">
      <div className="flex flex-col my-4">
        <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
        <h1 className="text-center text-tertiary font-semibold text-3xl flex justify-center items-center gap-3">
          <MdOutlineArticle />
          Articles
        </h1>
        <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table
            tableData={sortedArticles}
            columns={archivesColumns}
            emptyMessage="No articles published."
          />
        )}
      </div>
    </section>
  );
};

export default Archives;
