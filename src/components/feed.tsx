"use client";

import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/providers/user-store-provider";
import { useEffect } from "react";

export function Feed() {
  const { 
    isPending,
    isError,
    data: user,
    error,
  } = useUser();
  const { setUser } = useUserStore((state) => state);
  
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if(isPending){
    return <div>user is loading...</div>
  }

  if(isError){
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div>feed</div>
    </>
  );
}
