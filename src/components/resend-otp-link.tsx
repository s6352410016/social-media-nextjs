"use client";

import { Button, HStack } from "@chakra-ui/react";
import { callApi } from "@/utils/helpers/call-api";
import { ForgotPasswordSchema } from "@/utils/validations/auth";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { useAuthUserStore } from "@/providers/auth-user-store-provider";
import { formatToastMessages } from "@/utils/helpers/format-toast-messages";

export function ResendOtpLink() {
  const { email } = useAuthUserStore((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  
  const handleResendOtp = useCallback(async () => {
    setIsLoading(true);
    const res = await callApi<ForgotPasswordSchema>("post", "email/send", {
      email,
    });
    setIsLoading(false);
    if (!res.success) {
      toast.error(formatToastMessages(res.message));
    } else {
      toast.success(formatToastMessages(res.message));
    }
  }, [email]);

  return (
    <HStack fontWeight="normal" gapX="0">
      {"Don't"} have an otp? &nbsp;
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
