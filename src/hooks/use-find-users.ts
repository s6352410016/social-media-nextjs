import { callApi } from "@/utils/helpers/call-api";
import { IUser } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useFindUsers(search: string, currentUserId?: string) {
  return useQuery({
    queryKey: ["users", search, currentUserId],
    queryFn: async ({ queryKey }) => {
      const res = await callApi(
        "get",
        `user/find-by-fullname/${queryKey[2]}?fullname=${queryKey[1]}`
      );
      if(!res.success){
        return Promise.reject(res);
      }

      return res.data as IUser[];
    },
    enabled: !!search && !!currentUserId,
  });
}
