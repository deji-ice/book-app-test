import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by title or author"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500"
  />
);

export default SearchBar;
