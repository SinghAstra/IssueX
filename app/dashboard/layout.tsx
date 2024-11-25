import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { navigation } from "@/config/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your GitHub issues efficiently",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar navigation={navigation} />
      <div className="lg:pl-64">
        <Header showLogo={false} showSearchBar={false} />
        <main className="py-4">{children}</main>
      </div>
    </div>
  );
}
