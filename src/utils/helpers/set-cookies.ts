import { NextResponse } from "next/server";

export function setCookies(
  key: string[] | string,
  value: string[] | string,
  res: NextResponse
) {
  if (Array.isArray(key) && Array.isArray(value)) {
    key.forEach((k, index) => {
      res.cookies.set(k, value[index], {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 3,
      });
    });
  } else if (typeof key === "string" && typeof value === "string") {
    res.cookies.set(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
  }
}
