import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function TableSkeleton() {
  return (
    <div className="p-4 w-full rounded-lg overflow-scroll scroll-smooth no-scrollbar">
      <div className="h-2" />
      {/* Header */}
      <div className="w-full border-collapse rounded-lg h-[30vh] overflow-hidden">
        <div className="bg-gray-300 text-white m-4 p-4 rounded-xl">
          {/* Table Header */}
        </div>
        {/* Table Headers */}
        <div className="bg-gray-300 m-4 p-4 h-full rounded-xl">
          {/* Table Header Content */}
        </div>
      </div>
      {/* Pagination */}
      <div className="h-2" />
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Pagination Buttons */}
        <div className="flex gap-3 items-center">
          {/* Pagination Buttons */}
          <button className="bg-gray-300 text-white rounded py-1 px-2 disabled:opacity-50 cursor-pointer">
            {"<<"}
          </button>
          {/* Repeat for each pagination button */}
        </div>
        {/* Page Info */}
        <span className="flex items-center gap-1">{/* Page Info */}</span>
        {/* Page Selector */}
        <span className="flex items-center gap-1">{/* Page Selector */}</span>
        {/* Page Size Selector */}
        <select className="border p-1 rounded cursor-pointer">
          {/* Page Size Options */}
        </select>
      </div>
    </div>
  );
}

export default TableSkeleton;
