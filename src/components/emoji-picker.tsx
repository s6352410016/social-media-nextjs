"use client";

import { Circle, Popover, Portal } from "@chakra-ui/react";
import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { useHandleEmojiSelect } from "@/hooks/use-handle-emoji-select";
import { usePopoverControl } from "@/hooks/use-popover-control";
import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface EmojiPickerProps {
  inputRef: RefObject<HTMLInputElement | null>;
  useFormReturn: UseFormReturn;
  valueKey: string;
}

export function EmojiPicker({
  inputRef,
  useFormReturn,
  valueKey,
}: EmojiPickerProps) {
  const { openEmojiPicker, handleOpenEmojiPicker } = usePopoverControl(inputRef);

  const handleEmojiSelect = useHandleEmojiSelect(
    inputRef,
    useFormReturn,
    valueKey,
  );

  return (
    <Popover.Root
      open={openEmojiPicker}
      onOpenChange={(e) => handleOpenEmojiPicker(e.open)}
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
            <Picker
              onEmojiClick={(e) => handleEmojiSelect(e)}
            />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
