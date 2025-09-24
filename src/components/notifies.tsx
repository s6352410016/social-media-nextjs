"use client";

import { useInView } from "react-intersection-observer";
import { useFindNotifies } from "@/hooks/use-find-notifies";
import { Avatar, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Spinner } from "./spinner";
import { Fragment, useEffect } from "react";
import { formatDate } from "@/utils/helpers/format-date";
import { useUserStore } from "@/providers/user-store-provider";
import NextLink from "next/link";

interface NotifiesProps {
  onNotifyCount: (count: number) => void;
}

export function Notifies({ onNotifyCount }: NotifiesProps) {
  const { user } = useUserStore((state) => state);
  const { ref, inView } = useInView();

  const {
    data: notifies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFindNotifies(10, user?.id);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (notifies) {
      const notifyCount = notifies.pages.flatMap(
        (page) => page.notifies
      ).length;
      onNotifyCount(notifyCount);
    }
  }, [notifies, onNotifyCount]);

  return (
    <Box maxH="400px" overflowY="auto">
      {status === "pending" ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="full"
          width="full"
        >
          <Spinner />
        </Flex>
      ) : (
        notifies?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.notifies.length ? (
              group.notifies.map((notify) => (
                <Link
                  key={notify.id}
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
                      <VStack
                        alignItems="start"
                        justifyContent="center"
                        gap="0"
                      >
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
              ))
            ) : (
              <Text my="4" textAlign="center" fontSize="md">
                Notify not found
              </Text>
            )}
          </Fragment>
        ))
      )}

      {isFetchingNextPage && <Spinner />}
      <Box ref={ref} />
    </Box>
  );
}
