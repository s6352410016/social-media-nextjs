import { callApi } from "@/utils/helpers/call-api";
import { INotify } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFindNotifies(limit: number, activeUserId?: number) {
  return useInfiniteQuery({
    queryKey: ["notifies"],
    queryFn: async ({ pageParam }) => {
      const res = await callApi(
        "get",
        `notification/finds?cursor=${pageParam}&limit=${limit}`
      );
      if (!res.success) {
        return Promise.reject(res);
      }
      return res.data as { notifies: INotify[]; nextCursor: number | null };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      const allNotifications = data.pages.map((page) => page.notifies).flat();
      const sortedNotifications = allNotifications
      .filter((notify) => (notify.senderId !== activeUserId) && (notify.receiverId === activeUserId))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return { ...data, pages: [{ notifies: sortedNotifications, nextCursor: null }] };
    },
  });
}
