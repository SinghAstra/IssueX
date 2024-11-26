import { cn } from "@/lib/utils";
import { Repository } from "@/types/repository";
import { GitFork, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Icons } from "../Icons";
import { Button, buttonVariants } from "../ui/button";

export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card min-h-[16rem]">
      <div className="font-bold text-lg flex mb-2 justify-between p-4">
        {repo.name}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-500" />
            <span>{repo.stars}</span>
          </div>

          <div className="flex items-center space-x-1">
            <GitFork size={16} className="text-gray-500" />
            <span>{repo.forks}</span>
          </div>
        </div>
      </div>

      {/* Limit the description */}
      <div className="text-gray-600 p-4 text-sm">{repo.description}</div>

      {/* Footer that stays at the bottom */}
      <div className="mt-auto p-4 border-t flex space-x-2">
        <Link
          href={repo.url}
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }), "flex-grow")}
        >
          <Icons.gitLogo className="mr-2" />
          Github
        </Link>

        <Button
          variant={repo.isConnected ? "green" : "default"}
          className="flex-grow"
        >
          {repo.isConnected ? "Connected" : "Connect"}
        </Button>
      </div>
    </div>
  );
}

// <div
//   className="bg-card rounded-[--radius] p-6 shadow-md hover:shadow-lg transition-all
//   border border-border hover:bg-[hsl(var(--repo-hover))] group backdrop-blur-3xl relative"
// >
