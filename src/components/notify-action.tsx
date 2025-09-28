"use client";

import { Badge, Circle, Portal } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { Notifies } from "./notifies";
import { useCallback, useState } from "react";
import { INotify } from "@/utils/types";
import { useReadNotify } from "@/hooks/use-read-notify";

export function NotifyAction() {
  const [unReadNotify, setUnReadNotify] = useState<INotify[]>([]);

  const mutation = useReadNotify();

  const handleNotifyCount = useCallback((notify: INotify[]) => {
    setUnReadNotify(notify);
  }, []);

  const handleReadNotify = useCallback(() => {
    unReadNotify.forEach((notify) => {
      mutation.mutate(notify.id);
    });
  }, [unReadNotify, mutation]);

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <Circle
          onClick={handleReadNotify}
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
          {unReadNotify && unReadNotify.length > 0 ? (
            <Badge
              size="sm"
              colorPalette="red"
              position="absolute"
              top="-5px"
              right="-3px"
              variant="solid"
              borderRadius="full"
            >
              {unReadNotify.length}
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
