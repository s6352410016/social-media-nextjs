import { Circle, Portal } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { Notifies } from "./notifies";

export function NotifyAction() {
  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Circle
          size="11"
          bg="gray.200"
          color="black"
          cursor="pointer"
          _hover={{
            backgroundColor: "gray.300",
            transitionDuration: "slow",
          }}
        >
          <FaBell />
        </Circle>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body overflowY="auto">
              <Popover.Title fontWeight="medium" fontSize="md" marginBottom="3">
                Notify:
              </Popover.Title>
              <Notifies />
              <Notifies />
              <Notifies />
              <Notifies />
              <Notifies />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
