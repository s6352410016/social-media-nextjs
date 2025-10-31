"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import { UsersSkeleton } from "./users-skeleton";
import { useNavigateUser } from "@/hooks/use-navigate-user";
import { useLoadingComponent } from "@/hooks/use-loading-component";

export function ActiveUserCard() {
  const { user, isLoading } = useUserStore((state) => state);

  const handleUserClick = useNavigateUser(user);

  const loadingComponent = useLoadingComponent(isLoading);

  if (loadingComponent || isLoading) {
    return (
      <Flex
        alignItems="center"
        p="4"
        borderRadius="lg"
        backgroundColor="white"
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
          onClick={handleUserClick}
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
