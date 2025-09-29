import { HStack } from "@chakra-ui/react";
import { NotifyAction } from "./notify-action";
import { ChatAction } from "./chat-action";
import { UserAction } from "./user-action";

export function TopBarActions() {
  return (
    <HStack 
      alignItems="center" 
      gapX="4"
      display="none"
      lg={{
        display: "flex"
      }}
    >
      <NotifyAction />
      <ChatAction />
      <UserAction />
    </HStack>
  );
}
