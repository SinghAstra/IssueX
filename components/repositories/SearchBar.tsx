import { Search } from "lucide-react";
import React from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search repositories..."
        className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}
