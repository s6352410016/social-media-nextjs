"use client";

import { useLoadingComponent } from "@/hooks/use-loading-component";
import { useNavigateUser } from "@/hooks/use-navigate-user";
import { useUserStore } from "@/providers/user-store-provider";
import { Avatar, Box, HStack, Input, SkeletonCircle } from "@chakra-ui/react";

export function CreatePost() {
  const { user, isLoading } = useUserStore((state) => state);

  const handleUserClick = useNavigateUser(user);

  const loadingComponent = useLoadingComponent(isLoading);

  return (
    <Box
      borderRadius="lg"
      width="full"
      height="130px"
      backgroundColor="white"
      p="4"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gapY="2"
    >
      <HStack gapX="3">
        {loadingComponent || isLoading ? (
          <SkeletonCircle size="12" />
        ) : (
          user && (
            <Box onClick={handleUserClick} cursor="pointer">
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
            </Box>
          )
        )}
        <Input
          size="lg"
          borderRadius="full"
          placeholder="Write something..."
          variant="subtle"
        />
      </HStack>
    </Box>
  );
}
