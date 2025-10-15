"use client";

import { useInView } from "react-intersection-observer";
import { useNotifies } from "@/hooks/use-notifies";
import { Box, Flex } from "@chakra-ui/react";
import { Spinner } from "./spinner";
import { Fragment, useEffect } from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { useNotifySocket } from "@/hooks/use-notify-socket";
import { INotify } from "@/utils/types";
import { Notify } from "./notify";
import { ItemsNotFound } from "./items-not-found";
import { NotifiesSkeleton } from "./notifies-skeleton";

interface NotifiesProps {
  onNotifyCount: (notify: INotify[]) => void;
}

export function Notifies({ onNotifyCount }: NotifiesProps) {
  const { user } = useUserStore((state) => state);
  const { ref, inView } = useInView();

  useNotifySocket(user?.id);
  const {
    data: notifies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status,
  } = useNotifies(10, user?.id);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (notifies) {
      const unReadNotifies = notifies.pages
        .flatMap((page) => page.notifies)
        .filter((notification) => !notification.isRead);
      onNotifyCount(unReadNotifies);
    }
  }, [notifies, onNotifyCount]);

  return (
    <Box maxH="400px" overflowY="auto">
      {status === "pending" ? (
        <NotifiesSkeleton amount={4} />
      ) : isLoading ? (
        <Flex
          width="full"
          height="full"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      ) : (
        notifies &&
        notifies.pages.map((group, i) => (
          <Fragment key={i}>
            {group.notifies.length ? (
              group.notifies.map((notify) => (
                <Notify key={notify.id} notify={notify} />
              ))
            ) : (
              <ItemsNotFound title="Notify" />
            )}
          </Fragment>
        ))
      )}

      {isFetchingNextPage && <Spinner />}
      <Box ref={ref} />
    </Box>
  );
}
