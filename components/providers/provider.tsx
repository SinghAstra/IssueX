"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import { SearchProvider } from "./search-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <TooltipProvider>
        <SearchProvider>{children}</SearchProvider>
      </TooltipProvider>
    </SessionProvider>
  );
};

export default Providers;
