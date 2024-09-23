"use client";

import { useSession } from "@/context/SessionContext";
import { REDIRECT_LOGIN_URL } from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { status, user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && user) {
      return router.replace(REDIRECT_LOGIN_URL);
    }
  }, [status, router, user]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default Layout;
