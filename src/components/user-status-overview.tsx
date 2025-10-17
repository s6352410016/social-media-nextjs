import { Stack } from "@chakra-ui/react";
import { ActiveUserCard } from "./active-user-card";
import { PeopleStatus } from "./people-status";

export function UserStatusOverview() {
  return (
    <Stack
      width="400px"
      height="full"
      display="none"
      flexDirection="column"
      alignItems="center"
      gapY="4"
      xl={{
        display: "flex",
      }}
    >
      <ActiveUserCard />
      <PeopleStatus />
    </Stack>
  );
}
