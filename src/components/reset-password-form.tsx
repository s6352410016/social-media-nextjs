"use client";

import { callApi } from "@/actions/call-api";
import { resetPasswordSchema, ResetPasswordSchema } from "@/utils/validations/auth";
import { Button, Field, Fieldset } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PasswordInput } from "./ui/password-input";

export function ResetPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await callApi<ResetPasswordSchema>(
      "patch",
      "auth/user/reset-password", 
      data,
    );
    if (!res.success) {
      toast.error(res.message);
    } else {
      reset();
      toast.success(res.message);
      router.push("/");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root width="400px">
        <Fieldset.Legend fontSize="3xl" color="gray.700" marginBottom="4">
          Reset password
        </Fieldset.Legend>

        <Fieldset.Content>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>
              Password: <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>
              Confirm password: <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput {...register("confirmPassword")} />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
}
