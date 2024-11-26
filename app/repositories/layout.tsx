import { Sidebar } from "@/components/layout/sidebar";
import { navigation } from "@/config/navigation";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connect Repository",
  description: "Manage your GitHub issues efficiently",
};

interface RepositoryLayoutProps {
  children: ReactNode;
}

export default function RepositoryLayout({ children }: RepositoryLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar navigation={navigation} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
