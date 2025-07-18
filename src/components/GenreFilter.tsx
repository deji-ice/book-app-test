import React from "react";

interface GenreFilterProps {
  selected: string;
  onChange: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selected,
  onChange,
}) => (
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
);

export default GenreFilter;
