import { Filter } from "lucide-react";
import React from "react";

const filters = [
  "All",
  "Connected",
  "Not Connected",
  "Personal",
  "Organization",
];

export function FilterBar({
  onFilter,
}: {
  onFilter: (filter: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilter(filter)}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
