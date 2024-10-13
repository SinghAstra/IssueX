"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

const WebhookSetup = () => {
  const session = useSession();
  console.log("session is ", session);

  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRepos = async () => {
      if (session) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/getUserRepos");
          const data = await response.json();
          if (data.repos) {
            setRepos(data.repos);
          }
        } catch (error) {
          console.error("Error fetching repos:", error);
          toast({
            title: "Error",
            description: "Failed to fetch repositories",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRepos();
  }, [session, toast]);

  const handleSetupWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepo) {
      toast({
        title: "Error",
        description: "Please select a repository",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-web-hook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoFullName: selectedRepo }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Webhook set up successfully!",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error setting up webhook. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>GitHub Webhook Setup</CardTitle>
          <CardDescription>Please sign in to set up webhooks.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Set up GitHub Webhook</CardTitle>
          <CardDescription>
            Choose a repository to set up a webhook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSetupWebhook}>
            <Select onValueChange={setSelectedRepo} value={selectedRepo}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                {repos.map((repo) => (
                  <SelectItem key={repo.id} value={repo.full_name}>
                    {repo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={handleSetupWebhook}
            disabled={isLoading || !selectedRepo}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : (
              "Set up Webhook"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WebhookSetup;
