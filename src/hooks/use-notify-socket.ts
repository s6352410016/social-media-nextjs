import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useSocketIo } from "@/providers/socket-io-provider";
import { useEffect } from "react";
import { INotify } from "@/utils/types";

export function useNotifySocket(activeUserId?: string) {
  const { socket } = useSocketIo();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on(`notification:${activeUserId}`, (newNotify) => {
      queryClient.setQueryData<
        InfiniteData<{ notifies: INotify[]; nextCursor: string | null }>
      >(["notifies"], (oldNotifies) => {
        if (!oldNotifies) {
          return undefined;
        }

        const newPage = { notifies: [newNotify], nextCursor: null };

        return {
          ...oldNotifies,
          pages: [newPage, ...oldNotifies.pages],
          pageParams: oldNotifies.pageParams,
        };
      });
    });

    return () => {
      socket?.off(`notification:${activeUserId}`);
    }
  }, [socket, queryClient, activeUserId]);
}
