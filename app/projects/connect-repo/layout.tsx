import { Metadata } from "next";
import React from "react";

interface ConnectLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Connect Repository",
  description: "Connect your GitHub repository to MergeX",
};

const ConnectRepoLayout = ({ children }: ConnectLayoutProps) => {
  return <div>{children}</div>;
};

export default ConnectRepoLayout;
