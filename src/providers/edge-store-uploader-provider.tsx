"use client";

import {
  UploaderProvider,
  UploadFn,
} from "@/components/upload/uploader-provider";
import React, { useCallback } from "react";

interface EdgeStoreUploaderProviderProps {
  children: React.ReactNode;
}

export function EdgeStoreUploaderProvider({
  children,
}: EdgeStoreUploaderProviderProps) {
  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      return {
        url: "",
      }
    },
    []
  );

  return <UploaderProvider uploadFn={uploadFn}>{children}</UploaderProvider>;
}
