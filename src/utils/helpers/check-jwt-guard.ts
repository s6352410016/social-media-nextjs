import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/utils/helpers/verify-jwt";
import { JWTExpired, JWTInvalid } from "jose/errors";
import { nextRedirect } from "./next-redirect";

type GuardOptions<T> = {
  req: NextRequest;
  cookieName: string;
  secret: Uint8Array;
  validate: (payload: T) => boolean;
  redirectTo?: string;
};

export async function checkJwtGuard<T extends object>({
  req,
  cookieName,
  secret,
  validate,
  redirectTo = "/",
}: GuardOptions<T>): Promise<NextResponse | null> {
  const token = req.cookies.get(cookieName)?.value;
  if (!token) {
    return nextRedirect(redirectTo, req);
  }

  try {
    const payload = await verifyJwt<T>(token, secret);
    if (!validate(payload)) {
      return nextRedirect(redirectTo, req);
    }
  } catch (error) {
    if (error instanceof JWTExpired || error instanceof JWTInvalid) {
      return nextRedirect(redirectTo, req);
    }
  }

  return null;
}
