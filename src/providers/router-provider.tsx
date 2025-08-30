"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setRouter } from "@/utils/helpers/router";

export function RouterProvider() {
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  return null;
}