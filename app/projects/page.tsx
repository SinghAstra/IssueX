"use client";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { UserAvatar } from "@/components/user-avatar";
import {
  ChevronDown,
  GitBranch,
  LayoutGrid,
  List,
  Plus,
  Search,
  Settings,
  Webhook,
} from "lucide-react";
import React, { useState } from "react";

interface ToggleButtonProps {
  mode: string;
  currentMode: string;
  onClick: (mode: string) => void;
  children: React.ReactNode;
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

const Projects = () => {
  const [viewMode, setViewMode] = useState("grid");
  const user = { name: "John Doe" };

  const repositories = [
    { name: "repo-1", lastWebhook: "2 minutes ago" },
    { name: "repo-2", lastWebhook: "1 hour ago" },
    { name: "repo-3", lastWebhook: "1 day ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Icons.logo className="mr-4" />
            <h2 className="text-xl ">MergeX / </h2>
            <h1 className="text-xl">{user.name}</h1>
          </div>
          <p className="text-gray-400">Manage your repositories and webhooks</p>
        </div>
        <UserAvatar />
      </header>

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
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> New Repository
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Management</CardTitle>
            <CardDescription>Manage your existing webhooks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
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
            <Button className="w-full">
              <Settings className="mr-2 h-4 w-4" /> Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Repositories with Webhooks</CardTitle>
          <CardDescription>
            Your repositories with active webhooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul
            className={`space-y-4 ${
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""
            }`}
          >
            {repositories.map((repo, index) => (
              <li
                key={index}
                className={`flex items-center justify-between ${
                  viewMode === "list"
                    ? "border-b pb-2 last:border-b-0"
                    : "border p-4 rounded-lg"
                }`}
              >
                <div className="flex items-center">
                  <GitBranch className="mr-2 h-4 w-4" />
                  <span className="font-medium">{repo.name}</span>
                </div>
                <div className="flex items-center">
                  <Webhook className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last triggered: {repo.lastWebhook}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
