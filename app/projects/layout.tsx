import Footer from "@/components/navigation/footer";
import React from "react";

interface ProjectProps {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children }: ProjectProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
