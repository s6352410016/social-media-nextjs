import { Header } from "@/components/header";
import { VStack } from "@chakra-ui/react";
import React from "react";

interface FeedLayoutProps {
  children: React.ReactNode;
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  return (
    <VStack alignItems="flex-start">
      <Header />
      {children}
    </VStack>
  );
}
