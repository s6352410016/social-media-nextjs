"use client";

import { callApi } from "@/actions/call-api";
import { useStore } from "@/hooks/use-store";
import { createAuthUserStore } from "@/stores/auth-user-store";
import { IOtpBody } from "@/utils/types";
import { otpSchema, OtpSchema } from "@/utils/validations/auth";
import { Button, Field, Heading, PinInput, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function VerifyOtpForm() {
  const authUserStore = createAuthUserStore();
  const email = useStore(authUserStore, (state) => state.email)!;

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await callApi<IOtpBody>(
      "post", 
      "email/verify-otp", 
      {
        email,
        otp: data.otp.join(""),
      },
    );
    if (!res.success) {
      toast.error(res.message);
    } else {
      reset();
      toast.success(res.message);
      router.push("/reset-password");
    }
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-[400px] flex flex-col justify-center items-center"
      >
        <VStack gapY="3" width="full">
          <Heading textAlign="start" size="2xl" color="gray.600">
            Verify otp
          </Heading>
          <Field.Root invalid={!!errors.otp}>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <PinInput.Root
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  width="full"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gapY="2"
                >
                  <PinInput.HiddenInput />
                  <PinInput.Control>
                    <PinInput.Input index={0} />
                    <PinInput.Input index={1} />
                    <PinInput.Input index={2} />
                    <PinInput.Input index={3} />
                    <PinInput.Input index={4} />
                    <PinInput.Input index={5} />
                  </PinInput.Control>
                  <Field.ErrorText>{errors.otp?.message}</Field.ErrorText>
                </PinInput.Root>
              )}
            />
          </Field.Root>
          <Button disabled={isSubmitting} type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </>
  );
}
