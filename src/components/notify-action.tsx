"use client";

import { Badge, Circle, Portal } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { Notifies } from "./notifies";
import { useState } from "react";

export function NotifyAction() {
  const [notifyCount, setNotifyCount] = useState<number | null>(null);

  function handleNotifyCount(count: number) {
    setNotifyCount(count);
  }

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Circle
          position="relative"
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
          {notifyCount && notifyCount > 0 ? (
            <Badge
              size="sm"
              colorPalette="red"
              position="absolute"
              top="-5px"
              right="-3px"
              variant="solid"
              borderRadius="full"
            >
              {notifyCount}
            </Badge>
          ) : null}
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
              <Notifies onNotifyCount={handleNotifyCount} />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
