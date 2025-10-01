import { formatDate } from "@/utils/helpers/format-date";
import { INotify } from "@/utils/types";
import { Avatar, Flex, HStack, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

interface NotifyPops {
  notify: INotify;
}

export function Notify({ notify }: NotifyPops) {
  return (
    <Link
      asChild
      _hover={{
        backgroundColor: "gray.100",
        transitionDuration: "slow",
        textDecoration: "none",
      }}
      _focus={{ boxShadow: "none", outline: "none" }}
      borderRadius="sm"
      display="block"
      borderY="0"
    >
      <NextLink
        href={
          notify.postId
            ? `/post/${notify.postId}`
            : `/profile/${notify.senderId}`
        }
      >
        <HStack alignItems="center" gapX="3" padding="2.5">
          {notify.sender.profileUrl ? (
            <Avatar.Root size="xl">
              <Avatar.Fallback name={notify.sender.fullname} />
              <Avatar.Image src={notify.sender.profileUrl} />
            </Avatar.Root>
          ) : (
            <Avatar.Root size="xl">
              <Avatar.Fallback name={notify.sender.fullname} />
            </Avatar.Root>
          )}
          <VStack alignItems="start" justifyContent="center" gap="0">
            <Text fontWeight="medium" truncate>
              {notify.sender.fullname}
            </Text>
            <Flex maxW="200px">
              <Text fontWeight="normal" truncate>
                {notify.message}
              </Text>
            </Flex>
            <Text color="fg.muted" textStyle="sm">
              {formatDate(notify.createdAt)}
            </Text>
          </VStack>
        </HStack>
      </NextLink>
    </Link>
  );
}
