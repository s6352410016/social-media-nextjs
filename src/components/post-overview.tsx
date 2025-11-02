import { Stack } from "@chakra-ui/react";
import { CreatePost } from "./create-post";

export function PostOverview() {
  return (
    <Stack
      flex="1"
      width="full"
      gapY="4"
    >
      <CreatePost />
    </Stack>
  );
}