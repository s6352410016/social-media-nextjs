"use client";

import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/providers/user-store-provider";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { SuggestPeople } from "./suggest-people";

export function Feed() {
  const { data: user } = useUser();
  const { setUser } = useUserStore((state) => state);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <Container
      display="flex"
      justifyContent="center"
      height="full"
      py="4"
    >
      <SuggestPeople />
      {/* <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
        <div className="shrink-0 w-full h-[350px] bg-amber-300 !mb-3">content...</div>
      </div>
      <div className="w-[300px] h-full bg-rose-200"></div> */}
    </Container>
  );
}
