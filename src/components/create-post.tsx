"use client";

import { useLoadingComponent } from "@/hooks/use-loading-component";
import { useNavigateUser } from "@/hooks/use-navigate-user";
import { useUserStore } from "@/providers/user-store-provider";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  SkeletonCircle,
} from "@chakra-ui/react";
import { FileUploader } from "./upload/multi-file";
import { EmojiPicker } from "./emoji-picker";
import { useForm } from "react-hook-form";
import {
  createContentSchema,
  CreateContentSchema,
} from "@/utils/validations/create-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef, useState } from "react";
import { EmojiClickData } from "emoji-picker-react";
import { useCreateContentStore } from "@/providers/create-content-store-provider";
import { useUploader } from "./upload/uploader-provider";
import { callApi } from "@/utils/helpers/call-api";
import { toast } from "react-toastify";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";

export function CreatePost() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const { setContext } = useCreateContentStore((state) => state);
  const { user, isLoading } = useUserStore((state) => state);

  const handleUserClick = useNavigateUser(user);

  const loadingComponent = useLoadingComponent(isLoading);

  const { fileStates, uploadFiles } = useUploader();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
    getValues,
    setFocus,
  } = useForm<CreateContentSchema>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      message: "",
    },
  });

  const content = watch("message");

  const onSubmit = handleSubmit(async ({ message }) => {
    if(!user){
      return;
    }

    if(!fileStates.length && message){
      const res = await callApi<CreateContentSchema>(
        "post",
        `post/create/${user.id}`,
        {
          message,
        },
      );
      if(res.success){
        reset();
        toast.success(formatToastMessages(res.message));
      }else{
        toast.error(formatToastMessages(res.message));
      }

      return;
    }

    // TODO: upload file to provider
    setContext({
      type: "POST",
      content: message,
    });
    uploadFiles();
  });

  const handleEmojiSelect = ({ emoji }: EmojiClickData) => {
    const input = inputRef.current;
    // เอาค่าล่าสุดจาก form
    const currentContent = getValues("message");

    if (!input) {
      return;
    }

    const selectionStart = input.selectionStart ?? 0;
    const selectionEnd = input.selectionEnd ?? 0;

    const start = currentContent?.substring(0, selectionStart);
    const end = currentContent?.substring(selectionEnd);
    const newContent = `${start}${emoji}${end}`;

    setValue("message", newContent);

    // ตั้ง cursor หลังอัปเดต content
    const cursorPosition = !start ? emoji.length : start.length + emoji.length;
    input.selectionStart = cursorPosition;
    input.selectionEnd = cursorPosition;
    setFocus("message");
  };

  const handleOpenEmojiPicker = useCallback((open: boolean) => {
    const focused = document.activeElement === inputRef.current;
    if (focused) {
      setOpenEmojiPicker(true);
      return;
    }
    setOpenEmojiPicker(open);
  }, []);

  return (
    <Box borderRadius="lg" width="full" backgroundColor="white" p="4">
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center gap-y-4"
      >
        <HStack gapX="3">
          {loadingComponent || isLoading ? (
            <SkeletonCircle size="12" />
          ) : (
            user && (
              <Box onClick={handleUserClick} cursor="pointer">
                {user.profileUrl ? (
                  <Avatar.Root size="xl">
                    <Avatar.Fallback name={user.fullname} />
                    <Avatar.Image src={user.profileUrl} />
                  </Avatar.Root>
                ) : (
                  <Avatar.Root size="xl">
                    <Avatar.Fallback name={user.fullname} />
                  </Avatar.Root>
                )}
              </Box>
            )
          )}
          <Input
            value={content}
            {...register("message")}
            ref={(e) => {
              register("message").ref(e);
              inputRef.current = e;
            }}
            size="lg"
            borderRadius="full"
            placeholder="Write something..."
            variant="subtle"
          />
          <EmojiPicker
            onEmojiSelect={handleEmojiSelect}
            onOpenEmojiPicker={handleOpenEmojiPicker}
            isOpenEmojiPicker={openEmojiPicker}
          />
        </HStack>
        <FileUploader
          maxFiles={10}
          accept={{
            "image/png": [],
            "image/jpeg": [],
            "image/webp": [],
            "video/mp4": [],
            "video/webm": [],
            "video/ogg": [],
          }}
        />
        <Flex justifyContent="flex-end">
          <Button 
            loading={isSubmitting}
            disabled={isSubmitting} 
            type="submit" 
            width="150px"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
