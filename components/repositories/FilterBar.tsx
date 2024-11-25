import React from "react";

const filters = ["All", "Connected", "Not Connected"];

export function FilterBar({
  onFilter,
}: {
  onFilter: (filter: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <div className="flex gap-2 items-center py-2 px-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilter(filter)}
            className="px-3 py-1 text-sm rounded-full bg-secondary hover:bg-secondary/80 
              text-secondary-foreground transition-all hover:ring-2 hover:ring-[hsl(var(--primary))]"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
