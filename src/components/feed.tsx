"use client";

import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/providers/user-store-provider";
import { useEffect } from "react";

export function Feed() {
  const user = useUser();
  const { setUser } = useUserStore((state) => state);
  
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return <div>feed</div>;
}
