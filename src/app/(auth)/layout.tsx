import { AuthRedirectLink } from "@/components/auth-redirect-link";
import { HStack, Image, VStack } from "@chakra-ui/react";
import NextImage from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HStack minHeight="100vh">
      <VStack 
        width="50vw" 
        height="100vh"
        justifyContent="center"
        >
        {children}
        <AuthRedirectLink />
      </VStack>
      <VStack 
        background="gray.100" 
        width="50vw" 
        height="100vh"
        justifyContent="center"
      >
        <Image asChild>
          <NextImage
            src="/auth-logo.svg"
            width={500}
            height={500}
            alt="auth-logo"
            priority
          />
        </Image>
      </VStack>
    </HStack>
  );
}
