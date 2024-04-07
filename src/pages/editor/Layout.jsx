// layouts/EditorLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SIdebar";

const EditorLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar/>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default EditorLayout;