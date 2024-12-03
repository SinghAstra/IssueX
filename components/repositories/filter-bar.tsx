import React from "react";

export function FilterBar({
  filters,
  activeFilter,
  onFilter,
}: {
  filters: string[];
  activeFilter: string;
  onFilter: (filter: string) => void;
}) {
  const handleFilterClick = (filter: string) => {
    onFilter(filter);
  };

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2">
      <div className="flex gap-2 items-center py-2 px-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-3 py-1 text-sm rounded-full transition-all hover:ring-2 
              ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground ring-2 ring-primary"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:ring-[hsl(var(--primary))]"
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
