import { RefObject, useCallback, useState } from "react";

export function usePopoverControl(
  inputRef: RefObject<HTMLInputElement | null>
) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const handleOpenEmojiPicker = useCallback((open: boolean) => {
    const focused = document.activeElement === inputRef.current;
    if (focused) {
      setOpenEmojiPicker(true);
      return;
    }
    setOpenEmojiPicker(open);
  }, [setOpenEmojiPicker]);

  return {
    openEmojiPicker,
    handleOpenEmojiPicker,
  }
}
