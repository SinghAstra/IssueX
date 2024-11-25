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
      {/*sidebar navigation*/}
      <div>Sidebar Here...</div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
