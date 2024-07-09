import React, { useState } from "react";
import TopBar from "../Topbar";
const Contentbar = () => {
  const isAdmin = useState(false);
  console.log("in sidebar");
  return (
    <div className="bg-orange-50 h-screen text-white">
      <TopBar />
      {/* {isAdmin && <></>} */}
    </div>
  );
};

export default Contentbar;
