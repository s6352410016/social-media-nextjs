import { NextRequest } from "next/server";
import { IForgotPasswordPayload, IResetPasswordPayload } from "./utils/types";
import { checkJwtGuard } from "./utils/helpers/check-jwt-guard";

const secretForgotPassword = new TextEncoder().encode(
  process.env.FORGOT_PASSWORD_SECRET
);
const secretResetPassword = new TextEncoder().encode(
  process.env.RESET_PASSWORD_SECRET
);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/verify-otp") {
    const redirect = await checkJwtGuard<IForgotPasswordPayload>({
      req,
      cookieName: "forgot_password_token",
      secret: secretForgotPassword,
      validate: (payload) => payload.sendEmailVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  } else if (req.nextUrl.pathname === "/reset-password") {
    const redirect = await checkJwtGuard<IResetPasswordPayload>({
      req,
      cookieName: "reset_password_token",
      secret: secretResetPassword,
      validate: (payload) => payload.otpVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  }
}

export const config = {
  matcher: ["/verify-otp", "/reset-password"],
};
