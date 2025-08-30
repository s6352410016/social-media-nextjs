"use client";

import { navigate } from "@/utils/helpers/router";
import { ICommonResponse } from "@/utils/types";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const errorData = error as unknown as ICommonResponse;
        if (errorData.status === 401) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const errorData = error as unknown as ICommonResponse;
      if (errorData.status === 401 && !errorData.success) {
        navigate("/");
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _, __, mutation) => {},
  }),
});

interface TanStackQueryClientProviderProps {
  children: React.ReactNode;
}

export function TanStackQueryClientProvider({
  children,
}: TanStackQueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
