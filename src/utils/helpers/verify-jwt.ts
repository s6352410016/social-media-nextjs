import { jwtVerify, JWTPayload } from "jose";

export async function verifyJwt<T extends object>(
  token: string,
  secret: Uint8Array
): Promise<JWTPayload & T> {
  const { payload } = await jwtVerify(token, secret);
  return payload as JWTPayload & T;
}