"use client";

import { Button, HStack } from "@chakra-ui/react";
import { callApi } from "@/actions/call-api";
import { ForgotPasswordSchema } from "@/utils/validations/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuthUserStore } from "@/providers/auth-user-store-provider";

export function ResendOtpLink() {
  const { email } = useAuthUserStore((state) => state);

  const [isLoading, setIsLoading] = useState(false);

  async function handleResendOtp() {
    setIsLoading(true);
    const res = await callApi<ForgotPasswordSchema>(
      "post",
      "email/send", 
      {
        email,
      },
    );
    setIsLoading(false);
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }

  return (
    <HStack fontWeight="normal" gapX="0">
      Don't have an otp? &nbsp;
      <Button 
        onClick={handleResendOtp} 
        disabled={isLoading}
        variant="plain" 
        padding="0"
      >
        resend
      </Button>
    </HStack>
  );
}
