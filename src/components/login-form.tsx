"use client";

import { callApi } from "@/utils/helpers/call-api";
import { LoginSchema, loginSchema } from "@/utils/validations/auth";
import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PasswordInput } from "./ui/password-input";
import { navigate } from "@/utils/helpers/router";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";
import { useQueryClient } from "@tanstack/react-query";

export function LoginForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await callApi<LoginSchema>(
      "post",
      "auth/login", 
      data,
    );
    if (!res.success) {
      toast.error(formatToastMessages(res.message));
    } else {
      reset();
      toast.success(formatToastMessages(res.message));

      queryClient.clear();
      navigate("/feed");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root width="400px">
        <Fieldset.Legend fontSize="3xl" color="gray.700" marginBottom="4">
          Login
        </Fieldset.Legend>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>
              Username: <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("username")} />
            <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>
              Password: <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
}
