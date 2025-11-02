"use client";

import { Circle, Popover, Portal } from "@chakra-ui/react";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface EmojiPickerProps {
  onEmojiSelect: (emoji: EmojiClickData) => void;
  onOpenEmojiPicker: (open: boolean) => void;
  isOpenEmojiPicker: boolean;
}

export function EmojiPicker({
  onEmojiSelect,
  onOpenEmojiPicker,
  isOpenEmojiPicker,
}: EmojiPickerProps) {
  return (
    <Popover.Root
      open={isOpenEmojiPicker}
      onOpenChange={(e) => onOpenEmojiPicker(e.open)}
      positioning={{ placement: "bottom-end" }}
    >
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
          <span className="text-xl">😊</span>
        </Circle>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Picker onEmojiClick={(e) => onEmojiSelect(e)} />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
