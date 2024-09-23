import { User } from "@/types/user/user";
import React, { createContext, useContext } from "react";

export type SessionStatus = "pending" | "authenticated" | "unauthenticated";

interface SessionCtxProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  status: SessionStatus;
  setStatus: React.Dispatch<React.SetStateAction<SessionStatus>>;
}

export const SessionCtx = createContext<SessionCtxProps | undefined>(undefined);

export const useSession = () => {
  const ctx = useContext(SessionCtx);
  if (!ctx) {
    throw Error("useSession must be used within an SessionProvider");
  }
  return ctx;
};
