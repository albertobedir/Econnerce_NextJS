import { Status } from "@/types/status";
import { createContext, useContext } from "react";

interface StatusCtxProps {
  status: Status;
  setStatus: (status: Status) => void;
  isPending: boolean;
  startTransition: (callback: () => void) => void;
}

export const StatusCtx = createContext<StatusCtxProps | undefined>(undefined);

export const useStatus = () => {
  const ctx = useContext(StatusCtx);
  if (!ctx) {
    throw Error("useStatus must be used within an StatusProvider");
  }
  return ctx;
};
