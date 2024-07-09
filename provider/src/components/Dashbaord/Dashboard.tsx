import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Contentbar from "./ContentBar";
const Dashboard = () => {
  return (
    <div className="flex divide-x divide-gray-300">
      <div className="w-1/5 h-screen">
        <Sidebar />
      </div>
      <div className="w-4/5">
        <Contentbar />
      </div>
    </div>
  );
};

export default Dashboard;
