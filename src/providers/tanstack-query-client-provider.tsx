"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

interface TanStackQueryClientProviderProps {
  children: React.ReactNode;
}

export function TanStackQueryClientProvider({ children }: TanStackQueryClientProviderProps) {
  return (
     <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
