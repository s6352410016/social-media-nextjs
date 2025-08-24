import { ResendOtpLink } from "./resend-otp-link";
import { VerifyOtpForm } from "./verify-otp-form";

export function VerifyOtp() {
  return (
    <>
      <VerifyOtpForm />
      <ResendOtpLink />
    </>
  );
}
