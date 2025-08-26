import { NextRequest } from "next/server";
import {
  IAtPayload,
  IErrorTokenPayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
} from "./utils/types";
import { checkJwtGuard } from "./utils/helpers/check-jwt-guard";

const secretForgotPassword = new TextEncoder().encode(
  process.env.FORGOT_PASSWORD_SECRET
);
const secretResetPassword = new TextEncoder().encode(
  process.env.RESET_PASSWORD_SECRET
);
const secretErrorToken = new TextEncoder().encode(
  process.env.SOCIAL_LOGIN_ERROR_SECRET
);
const atSecret = new TextEncoder().encode(
  process.env.AT_SECRET
);

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/verify-otp") {
    const token = req.cookies.get("forgot_password_token")?.value;
    const redirect = await checkJwtGuard<IForgotPasswordPayload>({
      req,
      token,
      secret: secretForgotPassword,
      validate: (payload) => payload.sendEmailVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  } else if (req.nextUrl.pathname === "/reset-password") {
    const token = req.cookies.get("reset_password_token")?.value;
    const redirect = await checkJwtGuard<IResetPasswordPayload>({
      req,
      token,
      secret: secretResetPassword,
      validate: (payload) => payload.otpVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  } else if (req.nextUrl.pathname === "/login-error") {
    const token = req.nextUrl.searchParams.get("error_token");
    const redirect = await checkJwtGuard<IErrorTokenPayload>({
      req,
      token,
      secret: secretErrorToken,
      validate: (payload) => payload.socialAuthVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  } else if (
    req.nextUrl.pathname === "/feed" || 
    req.nextUrl.pathname === "/profile"
  ) {
    const token = req.cookies.get("access_token")?.value;
    const redirect = await checkJwtGuard<IAtPayload>({
      req,
      token,
      secret: atSecret,
      validate: (payload) => payload.authVerified === true,
    });
    if (redirect) {
      return redirect;
    }
  }
}

export const config = {
  matcher: [
    "/verify-otp", 
    "/reset-password", 
    "/login-error",
    "/feed",
    "/profile",
  ],
};
