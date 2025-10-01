"use client";

import { Avatar, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { Spinner } from "./spinner";
import { useCallback } from "react";
import { IUser } from "@/utils/types";
import { navigate } from "@/utils/helpers/router";

interface PeopleSuggestProps {
  user: IUser;
}

export function PeopleSuggest({ user }: PeopleSuggestProps) {
  const handleUserClick = useCallback(() => {
    navigate(`/profile/${user.id}`);
  }, []);

  const handleFollowUser = useCallback(() => {}, []);

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
      px="2"
      mb="2"
    >
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
      <Stack 
        gap="0" 
        flex="1" 
        ml="3"
      >
        <Text fontWeight="medium">{user.fullname}</Text>
        <Text color="fg.muted" textStyle="sm">
          {user.email}
        </Text>
      </Stack>
      <IconButton
        onClick={handleFollowUser}
        spinner={<Spinner />}
        bg="gray.200"
        _hover={{
          backgroundColor: "gray.300",
          transitionDuration: "slow",
        }}
        rounded="full"
        size="lg"
      >
        <FaUserPlus color="black" />
      </IconButton>
    </Flex>
  );
}
