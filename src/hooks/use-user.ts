import { callApi } from "@/actions/call-api";
import { IUser } from "@/utils/types";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<IUser>();

  async function fetchUser() {
    const res = await callApi("get", "auth/profile");
    if (res.success) {
      setUser(res.data as IUser);
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return user;
}
