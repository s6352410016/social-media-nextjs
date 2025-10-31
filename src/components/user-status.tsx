"use client";

import { useNavigateUser } from "@/hooks/use-navigate-user";
import { IFollower, IUser } from "@/utils/types";
import { Avatar, Circle, Flex, Float, Stack, Text } from "@chakra-ui/react";

interface UserStatusProps {
  user: IUser & {
    followers: IFollower[];
    active?: boolean;
  };
}

export function UserStatus({ user }: UserStatusProps) {
  const handleUserClick = useNavigateUser(user);

  return (
    <Flex
      onClick={handleUserClick}    
      width="full"
      height="80px"
      borderRadius="lg"
      alignItems="center"
      justifyContent="space-between"
      _hover={{
        backgroundColor: "gray.100",
        transitionDuration: "slow",
      }}
      cursor="pointer"
      px="2.5"
      mb="2"
    >
      {user.profileUrl ? (
        <Avatar.Root size="xl">
          <Avatar.Fallback name={user.fullname} />
          <Avatar.Image src={user.profileUrl} />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            {user.active ? (
              <Circle
                bg="green.500"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            ) : (
              <Circle
                bg="gray.300"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            )}
          </Float>
        </Avatar.Root>
      ) : (
        <Avatar.Root size="xl">
          <Avatar.Fallback name={user.fullname} />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            {user.active ? (
              <Circle
                bg="green.500"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            ) : (
              <Circle
                bg="gray.300"
                size="8px"
                outline="0.2em solid"
                outlineColor="bg"
              />
            )}
          </Float>
        </Avatar.Root>
      )}
      <Stack gap="0" flex="1" ml="3">
        <Text fontWeight="medium">{user.fullname}</Text>
        <Text color="fg.muted" textStyle="sm">
          {user.email}
        </Text>
      </Stack>
    </Flex>
  );
}
