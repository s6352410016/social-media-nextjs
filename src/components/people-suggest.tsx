"use client";

import { Avatar, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa6";
import { Spinner } from "./spinner";
import React, { useCallback, useState } from "react";
import { IFollower, IUser } from "@/utils/types";
import { callApi } from "@/utils/helpers/call-api";
import { toast } from "react-toastify";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";
import { FaUserCheck } from "react-icons/fa";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import isEqual from "lodash/isEqual";
import { useNavigateUser } from "@/hooks/use-navigate-user";

interface PeopleSuggestProps {
  user: IUser & { followers: IFollower[] };
  activeUserId?: string;
}

export function PeopleSuggest({ user, activeUserId }: PeopleSuggestProps) {
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(false);

  const handleUserClick = useNavigateUser(user);

  const handleFollowUser = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setDisabled(true);
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 300));
      const res = await callApi(
        "post",
        `user/follow/${activeUserId}/${user.id}`
      ).finally(() => {
        setDisabled(false);
      });
      if (!res.success) {
        toast.error(formatToastMessages(res.message));
      } else {
        toast.success(formatToastMessages(res.message));

        const followerData = res.data as { follower: IFollower };

        queryClient.setQueryData<
          InfiniteData<{
            users: (IUser & { followers: IFollower[] })[];
            nextCursor: string | null;
          }>
        >(["usersSuggest"], (oldUsersSuggest) => {
          if (!oldUsersSuggest) {
            return undefined;
          }

          return {
            ...oldUsersSuggest,
            pages: oldUsersSuggest.pages.map((group) => {
              return {
                ...group,
                users: group.users.map(
                  (
                    userSuggest: IUser & {
                      followers: IFollower[];
                    }
                  ) => {
                    // Ignore user not target
                    if (userSuggest.id !== followerData.follower.followingId) {
                      return userSuggest;
                    }

                    // UnFollow
                    if (
                      userSuggest.followers.some((follower) =>
                        isEqual(follower, followerData.follower)
                      )
                    ) {
                      return {
                        ...userSuggest,
                        followers: userSuggest.followers.filter(
                          (follower) =>
                            !isEqual(follower, followerData.follower)
                        ),
                      };
                    }

                    // Follow
                    if (
                      userSuggest.followers.every(
                        (follower) => !isEqual(follower, followerData.follower)                          
                      )
                    ) {
                      return {
                        ...userSuggest,
                        followers: [
                          ...userSuggest.followers,
                          followerData.follower,
                        ],
                      };
                    }

                    return userSuggest;
                  }
                ),
              };
            }),
          };
        });
      }
    },
    [activeUserId, user.id]
  );

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
        spinner={<Spinner size="md" />}
        bg="gray.200"
        _hover={{
          backgroundColor: "gray.300",
          transitionDuration: "slow",
        }}
        rounded="full"
        size="lg"
      >
        {user.followers.some(
          (follower) => follower.followerId === activeUserId
        ) ? (
          <FaUserCheck color="black" />
        ) : (
          <FaUserPlus color="black" />
        )}
      </IconButton>
    </Flex>
  );
}
