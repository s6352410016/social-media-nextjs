import { callApi } from "@/utils/helpers/call-api";
import { INotify } from "@/utils/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useReadNotify() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notifyId: string) => {
      const res = await callApi(
        "patch",
        `${process.env.NEXT_PUBLIC_API_URL}/notification/update/read/${notifyId}`
      );
      if (!res.success) {
        return Promise.reject(res);
      }

      return res.data as INotify;
    },
    onMutate: async (notifyId: string) => {
      await queryClient.cancelQueries({ queryKey: ["notifies"] });

      const prevNoifies = queryClient.getQueryData<
        InfiniteData<{ notifies: INotify[]; nextCursor: string | null }>
      >(["notifies"]);

      queryClient.setQueryData<
        InfiniteData<{ notifies: INotify[]; nextCursor: string | null }>
      >(["notifies"], (oldNotifies) => {
        if (!oldNotifies) {
          return undefined;
        }

        return {
          ...oldNotifies,
          pages: oldNotifies.pages.map((page) => ({
            ...page,
            notifies: page.notifies.map((notify) =>
              notify.id === notifyId ? { ...notify, isRead: true } : notify
            ),
          })),
        };
      });

      return prevNoifies;
    },
    onError(error, notifyId, context) {
      queryClient.setQueryData<
        InfiniteData<{ notifies: INotify[]; nextCursor: string | null }>
      >(["notifies"], context);
    },
    onSuccess(notifyData) {
      queryClient.setQueryData<
        InfiniteData<{ notifies: INotify[]; nextCursor: string | null }>
      >(["notifies"], (oldNotifies) => {
        if (!oldNotifies) {
          return undefined;
        }

        return {
          ...oldNotifies,
          pages: oldNotifies.pages.map((page) => ({
            ...page,
            notifies: page.notifies.map((notify) =>
              notify.id === notifyData.id ? notifyData : notify
            ),
          })),
        };
      });
    },
  });
}
