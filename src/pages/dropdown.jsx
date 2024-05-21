import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

const DropdownCou = ({ onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Rwanda");
  const options = ["Rwanda", "Uganda"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option); 
  };

  return (
    <div className="relative inline-block text-left z-60">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring focus:border-indigo-700"
        >
          <span className="font-semibold text-slate-800 dark:text-slate-100  text-2xl ">
            {selectedOption}
          </span>
          <HiOutlineChevronDown className="ml-2 h-5 w-5  dark:text-slate-100 text-slate-800" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 px-6">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="block px-4 py-2  text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownCou;
