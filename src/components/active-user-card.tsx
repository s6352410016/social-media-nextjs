"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { navigate } from "@/utils/helpers/router";
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { UsersSkeleton } from "./users-skeleton";

export function ActiveUserCard() {
  const [loadingComponent, setLoadingComponent] = useState(true);

  const { user, isLoading } = useUserStore((state) => state);

  const handleActiveUserClick = useCallback(() => {
    navigate(`/profile/${user?.id}`);
  }, [navigate, user?.id]);

  useEffect(() => {
    if (!isLoading) {
      setLoadingComponent(false);
    }
  }, [isLoading]);

  if (loadingComponent || isLoading) {
    return (
      <Flex
        onClick={handleActiveUserClick}
        alignItems="center"
        p="4"
        borderRadius="lg"
        backgroundColor="white"
        cursor="pointer"
        width="full"
        height="80px"
      >
        <UsersSkeleton />
      </Flex>
    );
  }

  return (
    <>
      {user && (
        <Flex
          onClick={handleActiveUserClick}
          alignItems="center"
          p="4"
          borderRadius="lg"
          backgroundColor="white"
          cursor="pointer"
          width="full"
          height="80px"
        >
          <>
            {user.profileUrl ? (
              <Avatar.Root size="xl">
                <Avatar.Fallback name={user.fullname} />
                <Avatar.Image src={user.profileUrl} />
              </Avatar.Root>
            ) : (
              <Avatar.Root size="xl">
                <Avatar.Fallback name={user.fullname} />
              </Avatar.Root>
            )}
            <Stack gap="0" flex="1" ml="3">
              <Text fontWeight="medium">{user.fullname}</Text>
              <Text color="fg.muted" textStyle="sm">
                {user.email}
              </Text>
            </Stack>
          </>
        </Flex>
      )}
    </>
  );
}
