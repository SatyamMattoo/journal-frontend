import React from "react";
import { IoPersonOutline } from "react-icons/io5";

import Table from "../components/Table";
import { editorsColumns } from "../utils/columns";
import TableSkeleton from "../components/TableSkeleton";
import { useGetEditorsQuery } from "../store/api/articleApi";

const EditorialBorad = () => {
  const { data, isLoading, error } = useGetEditorsQuery();
  const editors = data?.editors || [];

  return (
    <section className="min-h-screen m-5">
      <div className="flex flex-col my-4">
        <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
        <h1 className="text-center text-tertiary font-semibold text-3xl flex justify-center items-center gap-3">
          <IoPersonOutline />
          Board of Reviewers
        </h1>
        <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
        <div className="flex flex-wrap m-2">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <Table
              columns={editorsColumns}
              tableData={editors}
              bottomView={false}
              emptyMessage="No editors found."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default EditorialBorad;
