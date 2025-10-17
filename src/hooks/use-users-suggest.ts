import { callApi } from "@/utils/helpers/call-api";
import { IFollower, IUser } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUsersSuggest(limit: number, activeUserId?: string) {
  return useInfiniteQuery({
    queryKey: ["usersSuggest"],
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const url = pageParam
        ? `user/finds/${activeUserId}?cursor=${pageParam}&limit=${limit}`
        : `user/finds/${activeUserId}?limit=${limit}`;

      await new Promise((resolve) => setTimeout(() => resolve(undefined), 300));
      const res = await callApi("get", url);
      if (!res.success) {
        return Promise.reject(res);
      }

      return res.data as {
        users: (IUser & { followers: IFollower[]; active?: boolean })[];
        nextCursor: string | null;
      };
    },
    enabled: !!activeUserId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });
}
