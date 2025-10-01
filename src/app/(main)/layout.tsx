import { Header } from "@/components/header";
import { VStack } from "@chakra-ui/react";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <VStack gap="0">
      <Header />
      <main className="max-h-[calc(100vh-8vh)] h-[calc(100vh-8vh)] w-full bg-gray-100">
        {children}
      </main>
    </VStack>
  );
}
