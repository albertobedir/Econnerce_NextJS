"use client";
import { StatusCtx } from "@/context/StatusContext";
import { Status } from "@/types/status";
import React, { useState, useTransition, useMemo } from "react";

export const StatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Status>({
    message: "",
    statusCode: undefined,
  });
  const [isPending, startTransition] = useTransition();

  const value = useMemo(
    () => ({
      isPending,
      startTransition,
      setStatus,
      status,
    }),
    [isPending, startTransition, status]
  );

  return <StatusCtx.Provider value={value}>{children}</StatusCtx.Provider>;
};
