"use client";

import { Button, HStack, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const GOOGLE_LOGIN_URL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL!;
const GITHUB_LOGIN_URL = process.env.NEXT_PUBLIC_GITHUB_LOGIN_URL!;

export function SocialLogin() {
  const pathname = usePathname();

  return (
    <>
      {(pathname === "/" || pathname === "/register") && (
        <HStack width="400px">
          <Button flex="1" variant="outline" asChild>
            <Link href={`${API_URL}${GOOGLE_LOGIN_URL}`}>
              <Icon size="lg">
                <FcGoogle />
              </Icon>
              Google login
            </Link>
          </Button>
          <Button flex="1" variant="surface" asChild>
            <Link href={`${API_URL}${GITHUB_LOGIN_URL}`}>
              <Icon size="lg">
                <IoLogoGithub />
              </Icon>
              Github login
            </Link>
          </Button>
        </HStack>
      )}
    </>
  );
}
