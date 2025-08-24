"use client";

import { Link, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

interface AuthRedirectLinkText {
  href: string;
  linkText: string;
  redirectText: string;
}

export function AuthRedirectLink() {
  const pathname = usePathname();

  const setText: AuthRedirectLinkText = {
    href: pathname === "/" ? "/register" : pathname === "/register" ? "/" : "/",
    redirectText:
      pathname === "/"
        ? "Dont' have an account?"
        : pathname === "/register"
        ? "Already have an account?"
        : "Already have an account?",
    linkText:
      pathname === "/"
        ? "Register"
        : pathname === "/register"
        ? "Login"
        : "Login",
  };

  return (
    <>
      <Text fontWeight="normal">
        {setText.redirectText} &nbsp;
        <Link asChild color="gray.600" fontWeight="semibold">
          <NextLink href={setText.href}>{setText.linkText}</NextLink>
        </Link>
      </Text>
      {pathname === "/" && (
        <Link asChild color="gray.600" fontWeight="semibold">
          <NextLink href="/forgot-password">Forgot password?</NextLink>
        </Link>
      )}
    </>
  );
}
