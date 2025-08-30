"use client";

import { Button, HStack, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigate } from "@/utils/helpers/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const GOOGLE_LOGIN_URL = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL!;
const GITHUB_LOGIN_URL = process.env.NEXT_PUBLIC_GITHUB_LOGIN_URL!;

export function SocialLogin() {
  const pathname = usePathname();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLogin = (url: string) => {
    setIsRedirecting(true);
    navigate(url);
  };

  return (
    <>
      {(pathname === "/" || pathname === "/register") && (
        <HStack width="400px">
          <Button
            disabled={isRedirecting}
            onClick={() => handleLogin(`${API_URL}${GOOGLE_LOGIN_URL}`)}
            flex="1"
            variant="surface"
            asChild
          >
            <HStack>
              <Icon size="lg">
                <FcGoogle />
              </Icon>
              Google login
            </HStack>
          </Button>
          <Button
            disabled={isRedirecting}
            onClick={() => handleLogin(`${API_URL}${GITHUB_LOGIN_URL}`)}
            flex="1"
            variant="surface"
            asChild
          >
            <HStack>
              <Icon size="lg">
                <IoLogoGithub />
              </Icon>
              Github login
            </HStack>
          </Button>
        </HStack>
      )}
    </>
  );
}
