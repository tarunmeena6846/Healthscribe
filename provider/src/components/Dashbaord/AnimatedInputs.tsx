import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedInput = ({ placeholder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLineClick = () => {
    setIsExpanded(true);
  };

  return (
    <div className="relative w-full">
      <motion.input
        type="text"
        placeholder={placeholder}
        initial={{ borderBottomWidth: 0 }}
        animate={{ borderBottomWidth: isExpanded ? 2 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-blue-500"
      />
      {!isExpanded && (
        <div
          onClick={handleLineClick}
          className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 cursor-pointer"
        >
          hello
        </div>
      )}
    </div>
  );
};

export default AnimatedInput;
