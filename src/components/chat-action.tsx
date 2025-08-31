import { Circle, Link } from "@chakra-ui/react";
import { IoChatbubble } from "react-icons/io5";
import NextLink from "next/link";

export function ChatAction() {
  return (
    <Link asChild>
      <NextLink href="/chat">
        <Circle
          size="11"
          bg="gray.200"
          color="black"
          cursor="pointer"
          _hover={{
            backgroundColor: "gray.300",
            transitionDuration: "slow",
          }}
        >
          <IoChatbubble />
        </Circle>
      </NextLink>
    </Link>
  );
}
