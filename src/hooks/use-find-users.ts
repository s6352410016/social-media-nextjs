import { callApi } from "@/actions/call-api";
import { IUser } from "@/utils/types";
import { useEffect, useState } from "react";

export function useFindUsers(search: string, currentUserId?: number): IUser[] {
  const [users, setUsers] = useState<IUser[]>([]);

  async function fetchUsers() {
    const res = await callApi("get", `user/find-by-fullname/${currentUserId}/${search}`);
    if (!res.success) {
      setUsers([]);
    } else {
      setUsers(res.data as IUser[]);
    }
  }

  useEffect(() => {
    if (!search || !currentUserId) {
      setUsers([]);
      return;
    }

    fetchUsers();
  }, [search, currentUserId]);

  return users;
}
