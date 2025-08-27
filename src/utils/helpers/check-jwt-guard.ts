import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/utils/helpers/verify-jwt";
import {
  JWSInvalid,
  JWSSignatureVerificationFailed,
  JWTExpired,
  JWTInvalid,
} from "jose/errors";
import { nextRedirect } from "./next-redirect";

type GuardOptions<T> = {
  req: NextRequest;
  token: string | undefined | null;
  secret: Uint8Array;
  validate: (payload: T) => boolean;
  redirectTo?: string;
};

export async function checkJwtGuard<T extends object>({
  req,
  token,
  secret,
  validate,
  redirectTo = "/",
}: GuardOptions<T>): Promise<NextResponse | null> {
  if (!token) {
    return nextRedirect(redirectTo, req);
  }

  try {
    const payload = await verifyJwt<T>(token, secret);
    if (!validate(payload)) {
      return nextRedirect(redirectTo, req);
    }
  } catch (error: unknown) {
    if (
      error instanceof JWTExpired ||
      error instanceof JWTInvalid ||
      error instanceof JWSSignatureVerificationFailed ||
      error instanceof JWSInvalid
    ) {
      return nextRedirect(redirectTo, req);
    }
  }

  return null;
}
