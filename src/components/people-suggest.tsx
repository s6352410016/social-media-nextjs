"use client";

import { Avatar, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { Spinner } from "./spinner";
import React, { useCallback, useState } from "react";
import { IUser } from "@/utils/types";
import { navigate } from "@/utils/helpers/router";
import { callApi } from "@/utils/helpers/call-api";
import { toast } from "react-toastify";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";

interface PeopleSuggestProps {
  user: IUser;
  activeUserId?: string;
}

export function PeopleSuggest({ user, activeUserId }: PeopleSuggestProps) {
  const [disabled, setDisabled] = useState(false);

  const handleUserClick = useCallback(() => {
    navigate(`/profile/${user.id}`);
  }, [user.id]);

  const handleFollowUser = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    setDisabled(true);
    await new Promise((resolve) => setTimeout(() => resolve(undefined), 500));
    const res = await callApi("post", `user/follow/${activeUserId}/${user.id}`).finally(() => {
      setDisabled(false);
    });
    if (!res.success) {
      toast.error(formatToastMessages(res.message));
    } else {
      toast.success(formatToastMessages(res.message));
    }

  }, [activeUserId, user.id]);

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
      <Stack gap="0" flex="1" ml="3">
        <Text fontWeight="medium">{user.fullname}</Text>
        <Text color="fg.muted" textStyle="sm">
          {user.email}
        </Text>
      </Stack>
      <IconButton
        onClick={handleFollowUser}
        loading={disabled}
        disabled={disabled}
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
