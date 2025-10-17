"use client";

import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/providers/user-store-provider";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { SuggestPeople } from "./suggest-people";
import { UserStatusOverview } from "./user-status-overview";
import { useSocketIo } from "@/providers/socket-io-provider";

export function Feed() {
  const { socket } = useSocketIo();
  const { data: user, isPending } = useUser();
  const { setUser, setLoading } = useUserStore((state) => state);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [isPending, setLoading]);

  useEffect(() => {
    if (user) {
      socket?.emit("connected", user);
    }
  }, [socket, user]);

  return (
    <Container
      display="flex"
      justifyContent="center"
      height="full"
      py="4"
      gapX="4"
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
      </div>*/}
      <UserStatusOverview />
    </Container>
  );
}
