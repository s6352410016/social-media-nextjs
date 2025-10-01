"use client";

import { useUserStore } from "@/providers/user-store-provider";
import { PeopleSuggest } from "./people-suggest";
import { useFindUsersSuggest } from "@/hooks/use-find-users-suggest";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Spinner } from "./spinner";
import { ItemsNotFound } from "./items-not-found";

export function PeoplesSuggest() {
  const { user } = useUserStore((state) => state);
  const { ref, inView } = useInView();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFindUsersSuggest(10, user?.id);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {isLoading ? (
        <Flex
          width="full"
          height="full"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      ) : !users?.pages.length ? (
        <ItemsNotFound title="People" />
      ) : (
        users?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.users.length ? (
              group.users.map((user) => (
                <PeopleSuggest key={user.id} user={user} />
              ))
            ) : (
              <ItemsNotFound title="People" />
            )}
          </Fragment>
        ))
      )}

      {isFetchingNextPage && <Spinner />}
      <Box ref={ref} />
    </>
  );
}
