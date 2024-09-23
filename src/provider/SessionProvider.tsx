"use client";
import { SessionCtx, SessionStatus } from "@/context/SessionContext";
import { getSession } from "@/lib/axios/authService";
import { User } from "@/types/user/user";
import { setTokens } from "@/utils/setTokens";
import { useEffect, useMemo, useState } from "react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<SessionStatus>("unauthenticated");

  useEffect(() => {
    (async () => {
      setStatus("pending");
      if (setTokens({ method: "get", at: true })?.accessToken) {
        const session = await getSession();
        if ("user" in session && session.user) {
          setUser(session.user);
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } else {
        setStatus("unauthenticated");
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      status,
      setStatus,
    }),
    [user, status]
  );

  return <SessionCtx.Provider value={value}>{children}</SessionCtx.Provider>;
};
