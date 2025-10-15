import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useSocketIo } from "@/providers/socket-io-provider";
import { useEffect } from "react";
import { INotify } from "@/utils/types";
import { isEqual } from "lodash";

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

        const newNotifyPage = oldNotifies.pages.map((group) => {
          const copyNotifies = [...group.notifies];
          const index = group.notifies.findIndex((oldNotify) => isEqual(oldNotify, newNotify));
          index !== -1 ? copyNotifies.splice(index, 1) : copyNotifies.unshift(newNotify);
          return {
            ...group,
            notifies: copyNotifies,
          };
        });

        return {
          ...oldNotifies,
          pages: [...newNotifyPage],
        };
      });
    });

    return () => {
      socket?.off(`notification:${activeUserId}`);
    };
  }, [socket, queryClient, activeUserId]);
}
