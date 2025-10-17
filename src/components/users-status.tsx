"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ItemsNotFound } from "./items-not-found";
import { useUsersSuggest } from "@/hooks/use-users-suggest";
import { useUserStore } from "@/providers/user-store-provider";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./spinner";
import { UsersSkeleton } from "./users-skeleton";
import { UserStatus } from "./user-status";
import { useUsersSocket } from "@/hooks/use-users-socket";
import { useQueryClient } from "@tanstack/react-query";
import { UsersTemp } from "@/utils/types";
import { setQueryDataUsersStatus } from "@/utils/helpers/set-query-data-users-status";

export function UsersStatus() {
  const queryClient = useQueryClient();

  const { ref, inView } = useInView();
  const { user } = useUserStore((state) => state);
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    status,
  } = useUsersSuggest(10, user?.id);

  useUsersSocket(queryClient);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const tempUsers = queryClient.getQueryData<UsersTemp>([
      "usersSuggest_temp",
    ]);
    if (tempUsers) {
      // set online status
      setQueryDataUsersStatus(queryClient, tempUsers);

      queryClient.removeQueries({
        queryKey: ["usersSuggest_temp"],
        exact: true,
      });
    }
  }, [isSuccess, queryClient]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <UsersSkeleton amount={8} height="68px" />;
  }

  if (isLoading) {
    return (
      <Flex
        width="full"
        height="full"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      {users &&
        users.pages.map((group, i) => (
          <Fragment key={i}>
            {group.users.length ? (
              group.users.map((user) => (
                <UserStatus key={user.id} user={user} />
              ))
            ) : (
              <ItemsNotFound title="people" />
            )}
          </Fragment>
        ))}

      {isFetchingNextPage && <Spinner size="lg" />}
      <Box ref={ref} />
    </>
  );
}
