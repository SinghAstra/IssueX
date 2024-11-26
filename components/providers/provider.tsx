"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { SearchProvider } from "./search-provider";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <SearchProvider>{children}</SearchProvider>
    </SessionProvider>
  );
};

export default Providers;
