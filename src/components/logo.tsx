import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export function Logo() {
  return (
    <Heading size="3xl">
      <Link asChild>
        <NextLink href="/feed">BYNSocial</NextLink>
      </Link>
    </Heading>
  );
}
