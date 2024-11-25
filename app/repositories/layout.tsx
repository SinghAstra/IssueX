import { Header } from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Repository",
  description: "Manage your GitHub issues efficiently",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showLogo={true} showSearchBar={true} />
      <main className="py-4">{children}</main>
    </div>
  );
}
