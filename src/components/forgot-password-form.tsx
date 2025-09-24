"use client";

import { callApi } from "@/utils/helpers/call-api";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/utils/validations/auth";
import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuthUserStore } from "@/providers/auth-user-store-provider";
import { navigate } from "@/utils/helpers/router";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";

export function ForgotPasswordForm() {
  const { setEmail } = useAuthUserStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await callApi<ForgotPasswordSchema>(
      "post",
      "email/send",
      data,
    );
    if (!res.success) {
      toast.error(formatToastMessages(res.message));
    } else {
      reset();
      setEmail(data.email);
      toast.success(formatToastMessages(res.message));
      navigate("/verify-otp");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root width="400px">
        <Fieldset.Legend fontSize="3xl" color="gray.700" marginBottom="4">
          Forgot password
        </Fieldset.Legend>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>
              Email: <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("email")} type="email" />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
}
