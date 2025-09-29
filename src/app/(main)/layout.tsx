import { Header } from "@/components/header";
import { VStack } from "@chakra-ui/react";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <VStack>
      <Header />
      {children}
    </VStack>
  );
}
