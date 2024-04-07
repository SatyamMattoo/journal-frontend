import React from "react";
import { useParams } from "react-router-dom";

import Table from "../components/Table";
import { archivesColumns } from "../utils/columns";
import { useGetArticlesForIssueQuery } from "../store/api/articleApi";
import TableSkeleton from "../components/TableSkeleton";

const VolumeArticles = () => {
  const { volumeNumber, issueNumber } = useParams();
  const { data, isLoading, isSuccess } = useGetArticlesForIssueQuery({
    volumeNumber,
    issueNumber,
  });

  const sortedArticles = isSuccess
    ? [...(data.articles || [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <section className="min-h-screen m-5">
      <VolumeHeader volumeNumber={volumeNumber} issueNumber={issueNumber} />
      <div className="flex flex-wrap volumes m-6">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table
            columns={archivesColumns}
            tableData={sortedArticles}
            emptyMessage="No articles published."
          />
        )}
      </div>
    </section>
  );
};

const VolumeHeader = ({ volumeNumber, issueNumber }) => (
  <div className="flex flex-col my-4">
    <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
    <h1 className="text-3xl text-center text-primary">
      Volume: {volumeNumber} Issue: {issueNumber}
    </h1>
    <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
  </div>
);

export default VolumeArticles;
