import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // Core functionality
    "github issue management",
    "issue tracking",
    "project management",
    "repository management",
    "bug tracking",
    "feature request management",

    // AI-related
    "ai powered analysis",
    "automated issue analysis",
    "smart issue categorization",
    "ai bug detection",

    // Technical features
    "github integration",
    "webhook automation",
    "issue templates",
    "pull request management",
    "oauth authentication",

    // Technologies
    "nextjs",
    "typescript",
    "github api",
    "nextauth",
    "artificial intelligence",

    // User features
    "bug report templates",
    "feature request templates",
    "improvement proposals",
    "repository automation",
    "code collaboration",

    // Development workflow
    "development workflow",
    "team collaboration",
    "code quality",
    "project documentation",
    "software development",
  ],
  authors: [
    {
      name: "SinghAstra",
      url: "https://github.com/SinghAstra",
    },
  ],
  creator: "SinghAstra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/api/og"],
    creator: "@singhastra",
  },
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
