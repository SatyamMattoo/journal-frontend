// layouts/EditorLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Sidebar />
      <div className="w-full overflow-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
