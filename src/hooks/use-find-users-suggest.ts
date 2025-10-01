import { callApi } from "@/utils/helpers/call-api";
import { IUser } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFindUsersSuggest(limit: number, activeUserId?: string) {
  return useInfiniteQuery({
    queryKey: ["usersSuggest"],
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const url = pageParam
        ? `user/finds/${activeUserId}?cursor=${pageParam}&limit=${limit}`
        : `user/finds/${activeUserId}?limit=${limit}`;

      const res = await callApi("get", url);
      if (!res.success) {
        return Promise.reject(res);
      }

      return res.data as { users: IUser[]; nextCursor: string | null };
    },
    enabled: !!activeUserId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });
}
