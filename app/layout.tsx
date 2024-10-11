import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background text-foreground antialiased !font-default overflow-x-hidden border-border`}>{children}</body>
    </html>
  );
}
