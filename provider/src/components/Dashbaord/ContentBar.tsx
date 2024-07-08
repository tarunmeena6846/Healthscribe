import React from "react";
import TopBar from "../Topbar";
const Contentbar = () => {
  console.log("in sidebar");
  return (
    <div className="bg-green-500 h-screen text-white">
      <TopBar />
    </div>
  );
};

export default Contentbar;
