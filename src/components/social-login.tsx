import { Button, HStack, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import Link from "next/link";

const API_URL = process.env.API_URL!;

export function SocialLogin() {
  return (
    <HStack width="400px">
      <Button flex="1" variant="outline" asChild>
        <Link href={`${API_URL}${process.env.GOOGLE_LOGIN_URL}`}>
          <Icon size="lg">
            <FcGoogle />
          </Icon>
          Google login
        </Link>
      </Button>
      <Button flex="1" variant="surface" asChild>
        <Link href={`${API_URL}${process.env.GITHUB_LOGIN_URL}`}>
          <Icon size="lg">
            <IoLogoGithub />
          </Icon>
          Github login
        </Link>
      </Button>
    </HStack>
  );
}
