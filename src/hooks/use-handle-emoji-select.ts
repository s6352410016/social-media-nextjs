import { EmojiClickData } from "emoji-picker-react";
import { RefObject, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

export function useHandleEmojiSelect(
  inputRef: RefObject<HTMLInputElement | null>,
  { getValues, setValue, setFocus }: UseFormReturn,
  valueKey: string
) {
  return useCallback(
    ({ emoji }: EmojiClickData) => {
      const input = inputRef.current;
      // เอาค่าล่าสุดจาก form
      const currentContent = getValues(valueKey);

      if (!input) {
        return;
      }

      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;

      const start = currentContent?.substring(0, selectionStart);
      const end = currentContent?.substring(selectionEnd);
      const newContent = `${start}${emoji}${end}`;

      setValue(valueKey, newContent);

      // ตั้ง cursor หลังอัปเดต content
      const cursorPosition = !start
        ? emoji.length
        : start.length + emoji.length;
      input.selectionStart = cursorPosition;
      input.selectionEnd = cursorPosition;
      setFocus(valueKey);
    },
    [getValues, setValue, setFocus]
  );
}
