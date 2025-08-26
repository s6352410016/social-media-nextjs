import { NextRequest, NextResponse } from "next/server";

export function nextRedirect(redirectTo: string, req: NextRequest) {
  return NextResponse.redirect(new URL(redirectTo, req.url));
}
