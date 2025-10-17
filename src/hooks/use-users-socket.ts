import { useSocketIo } from "@/providers/socket-io-provider";
import { setQueryDataUsersStatus } from "@/utils/helpers/set-query-data-users-status";
import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useUsersSocket(queryClient: QueryClient) {
  const { socket } = useSocketIo();

  useEffect(() => {
    socket?.on("usersActive", (users) => {
      const usersSuggest = queryClient.getQueryData(["usersSuggest"]);

      if (!usersSuggest) {
        queryClient.setQueryData(["usersSuggest_temp"], users);
        return;
      }

      // set offline status
      setQueryDataUsersStatus(queryClient, users);
    });

    return () => {
      socket?.off("usersActive");
    };
  }, [socket, queryClient]);
}
