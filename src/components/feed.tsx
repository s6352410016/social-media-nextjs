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
    <div className="bg-rose-200 w-full h-[calc(100vh-70px)] flex justify-center">
      <div className="fixed left-0 w-[500px] bg-green-300 h-full">side bar</div>
      <div className="w-full">content...</div>
      <div className="fixed right-0 w-[500px] bg-blue-300 h-full">side bar right</div>
    </div>
  );
}
