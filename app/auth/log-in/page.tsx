"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LogInPage = () => {
  const handleGithubLogin = async () => {
    try {
      await signIn("github", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log("GitHub authentication error:", error);
    }
  };
  return (
    <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
      <div className="flex items-center w-full py-8 border-b border-border/80">
        <Link href="/" className="flex items-center gap-x-2">
          <Icons.logo className="w-8 h-8 text-primary" />
          <h1 className="text-lg font-medium">{siteConfig.name}</h1>
        </Link>
      </div>
      <div className="w-full mt-5" onClick={handleGithubLogin}>
        <Button variant="outline" className="w-full bg-background">
          <Icons.github className="mr-2 h-4 w-4" />
          Continue with Github
        </Button>
      </div>
    </div>
  );
};

export default LogInPage;
