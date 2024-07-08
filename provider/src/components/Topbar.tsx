import React from "react";

const TopBar = () => {
  return (
    <div className=" p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <a href="#home" className="text-white hover:text-gray-300">
          Home
        </a>
        <a href="#about" className="text-white hover:text-gray-300">
          About
        </a>
        <a href="#contact" className="text-white hover:text-gray-300">
          Contact
        </a>
      </div>
    </div>
  );
};

export default TopBar;
