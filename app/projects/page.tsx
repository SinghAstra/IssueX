import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GitBranch, Plus, Search, Settings, Webhook } from "lucide-react";
import React from "react";

const Projects = () => {
  // Mock data for repositories with webhooks
  const repositories = [
    { name: "repo-1", lastWebhook: "2 minutes ago" },
    { name: "repo-2", lastWebhook: "1 hour ago" },
    { name: "repo-3", lastWebhook: "1 day ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">MergeX Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your repositories and webhooks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search repositories..."
            className="w-64"
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </header>

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
          <ul className="space-y-4">
            {repositories.map((repo, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
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
