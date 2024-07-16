import { useState } from "react";
import { motion } from "framer-motion";

const AnimatedInput = ({ value, onChange, placeholder }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <motion.input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 border-b-2 border-gray-300 outline-none text-xl"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.3 }}
        onBlur={() => !value && setIsFocused(false)}
        autoFocus
      />
    </div>
  );
};

export default AnimatedInput;
