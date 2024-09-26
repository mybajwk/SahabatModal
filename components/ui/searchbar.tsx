import React from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./input";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  return (
    <div className="w-[80vw] md:w-[50vw] bg-white rounded-md flex items-center">
      <Input
        className="flex-1 text-black text-xs"
        placeholder="Search..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="w-1/5 max-w-[50px] h-9 flex justify-center items-center rounded-r-md">
        <IoIosSearch className="text-black" />
      </button>
    </div>
  );
};

export default SearchBar;
