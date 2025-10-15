"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { PeopleSuggest } from "./people-suggest";
import { useUsersSuggest } from "@/hooks/use-users-suggest";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Spinner } from "./spinner";
import { ItemsNotFound } from "./items-not-found";
import { UsersSkeleton } from "./users-skeleton";

export function PeoplesSuggest() {
  const { user: activeUser } = useUserStore((state) => state);
  const { ref, inView } = useInView();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useUsersSuggest(10, activeUser?.id);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <UsersSkeleton amount={9} />;
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
                <PeopleSuggest
                  key={user.id}
                  user={user}
                  activeUserId={activeUser?.id}
                />
              ))
            ) : (
              <ItemsNotFound title="People" />
            )}
          </Fragment>
        ))}

      {isFetchingNextPage && <Spinner />}
      <Box ref={ref} />
    </>
  );
}
