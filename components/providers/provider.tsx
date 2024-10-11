"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const client = new QueryClient();

  console.log("client is ", client);

  return (
    <QueryClientProvider client={client}>
      {/* <SessionProvider> */}
      {children}
      {/* </SessionProvider> */}
    </QueryClientProvider>
  );
};

export default Providers;
