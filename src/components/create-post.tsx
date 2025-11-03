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
import { EmojiPicker } from "./emoji-picker";
import { useForm } from "react-hook-form";
import {
  createContentSchema,
  CreateContentSchema,
} from "@/utils/validations/create-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

export function CreatePost() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { user, isLoading } = useUserStore((state) => state);

  const handleUserClick = useNavigateUser(user);

  const loadingComponent = useLoadingComponent(isLoading);

  const form = useForm<CreateContentSchema>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    watch,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = form;

  const content = watch("message");

  const onSubmit = handleSubmit(async ({ message }) => {});

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
            inputRef={inputRef}
            useFormReturn={form}
            valueKey="message"
          />
        </HStack>
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
