"use client";

import { useUserStore } from "@/providers/user-store-provider";

export function Test() {
  const { user } = useUserStore((state) => state);
  console.log(user)

  return (
    <div>test</div>
  )
}
