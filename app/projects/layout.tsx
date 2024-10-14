"use client";
import Footer from "@/components/navigation/footer";
import { Icons } from "@/components/ui/Icons";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { UserAvatar } from "@/components/user-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface ProjectProps {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children }: ProjectProps) {
  const session = useSession();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 pt-8">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Link href="/projects" className="flex items-center">
              <Icons.logo className="mr-4" />
              <h2 className="text-xl ">MergeX / </h2>
              <h1 className="text-xl">{session?.data?.user.name}</h1>
            </Link>
            <TextGenerateEffect
              words="Manage your repositories and webhooks."
              className="text-xl mb-4 text-gray-400"
            />
          </div>
          <UserAvatar />
        </header>
      </div>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
