import { Sidebar } from "@/components/layout/sidebar";
import { navigation } from "@/config/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat",
  description: "Have a conversation",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar navigation={navigation} />
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
