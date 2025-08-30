import { callApi } from "@/actions/call-api";
import { IUser } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await callApi("get", "auth/profile");
      if(!res.success){
        return Promise.reject(res);
      }

      return res.data as IUser;
    },
    staleTime: Infinity, 
  });
}
