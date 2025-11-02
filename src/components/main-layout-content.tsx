"use client";

import { usePathname } from "next/navigation";
import { SuggestPeople } from "./suggest-people";
import { UserStatusOverview } from "./user-status-overview";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayoutContent({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="w-full h-full flex justify-center py-4 px-4 2xl:px-56 gap-x-4">
      {(pathname === "/feed" || pathname.startsWith("/post")) && <SuggestPeople />}
      {children}
      {(pathname === "/feed" || pathname.startsWith("/post")) && <UserStatusOverview />}
    </div>
  );
}
