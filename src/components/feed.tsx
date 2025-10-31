"use client";

import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/providers/user-store-provider";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { SuggestPeople } from "./suggest-people";
import { UserStatusOverview } from "./user-status-overview";
import { useSocketIo } from "@/providers/socket-io-provider";
import { PostOverview } from "./post-overview";

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
      fluid
      display="flex"
      justifyContent="center"
      height="full"
      py="4"
      gapX="4"
      px="56"
    >
      <SuggestPeople />
      <PostOverview />
      <UserStatusOverview />
    </Container>
  );
}
