import { callApi } from "@/utils/helpers/call-api";
import { IUser } from "@/utils/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUsers(search: string, limit: number, activeUserId?: string) {
  return useInfiniteQuery({
    queryKey: ["users", search],
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const url = pageParam
        ? `user/find-by-fullname/${activeUserId}?fullname=${search}&cursor=${pageParam}&limit=${limit}`
        : `user/find-by-fullname/${activeUserId}?fullname=${search}&limit=${limit}`;

      await new Promise((resolve) => setTimeout(() => resolve(undefined), 300));  
      const res = await callApi("get", url);
      if (!res.success) {
        return Promise.reject(res);
      }

      return res.data as { users: IUser[]; nextCursor: string | null };
    },
    enabled: !!search && !!activeUserId,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });
}
