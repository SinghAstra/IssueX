"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import {
  BoxesIcon,
  ChevronDown,
  Dot,
  GitBranch,
  Plus,
  Settings,
  Webhook,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ToggleButtonProps {
  mode: string;
  currentMode: string;
  onClick: (mode: string) => void;
  children: React.ReactNode;
}

interface Repository {
  id: string;
  userId: string;
  repoFullName: string;
  lastTriggered: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ToggleButton = ({
  mode,
  currentMode,
  onClick,
  children,
}: ToggleButtonProps) => (
  <button
    onClick={() => onClick(mode)}
    className={`p-2 ${
      mode === currentMode
        ? "text-white bg-primary-foreground border-0"
        : "text-gray-500 "
    } transition-colors duration-200`}
  >
    {children}
  </button>
);

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4 mr-2"
      fill="currentColor"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.261.82-.577v-2.165c-3.338.727-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.833 2.809 1.304 3.494.996.107-.774.418-1.305.76-1.605-2.665-.305-5.466-1.333-5.466-5.933 0-1.312.468-2.381 1.236-3.221-.123-.303-.535-1.525.117-3.176 0 0 1.01-.323 3.3 1.23.958-.266 1.985-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.29-1.553 3.298-1.23 3.298-1.23.653 1.651.241 2.873.118 3.176.77.84 1.235 1.909 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.43.37.814 1.102.814 2.222v3.293c0 .318.218.694.824.576C20.565 21.798 24 17.303 24 12 24 5.373 18.627 0 12 0z" />
    </svg>
  );
}

const SkeletonRepo = () => (
  <div className="flex items-center justify-between p-4 border border-gray-800 animate-pulse">
    <div className="flex items-center space-x-3 flex-1">
      <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
      <div className="flex flex-col space-y-1">
        <div className="h-4 bg-gray-800 rounded w-48"></div>
        <div className="h-3 bg-gray-800 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-10">
    <BoxesIcon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-semibold text-gray-600">
      No repositories
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      Get started by connecting a new repository.
    </p>
    <div className="mt-6">
      <Link
        href="/projects/connect-repo"
        className={cn(buttonVariants({ className: "mx-auto" }))}
      >
        <Plus className="mr-2 h-4 w-4" /> New Repository
      </Link>
    </div>
  </div>
);

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [connectedRepos, setConnectedRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRepos = connectedRepos.filter((repo) =>
    repo.repoFullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        const response = await fetch("/api/get-web-hooks");
        const data = await response.json();
        setConnectedRepos(data.webhooks ? data.webhooks : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebhooks();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="🔍 Search repositories and projects..."
            className="w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort By <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Sort by name</DropdownMenuItem>
            <DropdownMenuItem>Sort by activity</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex rounded-md overflow-hidden border gap-2 p-1">
          <ToggleButton
            mode="grid"
            currentMode={viewMode}
            onClick={setViewMode}
          >
            <Icons.grid className="h-4 w-4" />
          </ToggleButton>
          <ToggleButton
            mode="list"
            currentMode={viewMode}
            onClick={setViewMode}
          >
            <Icons.menu className="h-4 w-4" />
          </ToggleButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Repository</CardTitle>
            <CardDescription>Set up a new repo with webhooks</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/projects/connect-repo"
              className={cn(buttonVariants({ className: "w-full" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> New Repository
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Management</CardTitle>
            <CardDescription>Manage your existing webhooks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled={true}>
              <Webhook className="mr-2 h-4 w-4" /> Manage Webhooks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Configure your MergeX account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled={true}>
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Repositories with Webhooks</CardTitle>
          <CardDescription>
            Your repositories with active webhooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="rounded-md overflow-hidden">
              <SkeletonRepo />
              <SkeletonRepo />
              <SkeletonRepo />
            </div>
          ) : filteredRepos.length > 0 ? (
            <div className="rounded-md overflow-hidden">
              {filteredRepos.map((repo, index) => (
                <div
                  key={repo.id}
                  className={`flex items-center justify-between p-4 border border-gray-800 transition-all duration-200 ease-in-out hover:bg-gray-800 cursor-pointer ${
                    index === 0 ? "rounded-t-md" : ""
                  } ${
                    index === filteredRepos.length - 1 ? "rounded-b-md" : ""
                  }`}
                >
                  <Link
                    href={`https://github.com/${repo.repoFullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 flex-1"
                  >
                    <GitHubIcon />
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-sm font-semibold ">
                        {repo.repoFullName}
                      </h3>
                      <p className="text-xs text-gray-400 flex items-center gap-0.2">
                        {repo.lastTriggered && (
                          <>
                            <Dot className="h-8 w-8 text-gray-400" />
                            {formatDistanceToNowStrict(
                              new Date(repo.lastTriggered),
                              {
                                addSuffix: true,
                              }
                            )}
                          </>
                        )}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
