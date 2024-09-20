"use client";

import { useStatus } from "@/context/StatusContext";
import { getSession, logoutRequest } from "@/lib/axios/authService";
import { REDIRECT_LOGOUT_URL } from "@/routes";
import { useRouter } from "next/navigation";

function Home() {
  const { isPending, setStatus, startTransition, status } = useStatus();
  const router = useRouter();

  const getSession123 = () => {
    startTransition(async () => {
      const response = await getSession();
      setStatus({
        message: response.message,
        statusCode: response.statusCode,
      });
    });
  };

  const handleLogout = async () => {
    await logoutRequest().then(() => {
      router.push(REDIRECT_LOGOUT_URL);
    });
  };

  return (
    <div>
      <h1>
        home status: {status.message} code: {status.statusCode}
      </h1>
      <button
        className="bg-red-400"
        disabled={isPending}
        onClick={getSession123}
      >
        get session
      </button>
      <button
        className="bg-green-400"
        disabled={isPending}
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default Home;
