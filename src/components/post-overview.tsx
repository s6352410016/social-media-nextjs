import { VStack } from "@chakra-ui/react";
import { CreatePost } from "./create-post";

export function PostOverview() {
  return (
    <VStack
      flex="1"
      height="full"
      gapY="4"
    >
      <CreatePost />
    </VStack>
  );
}