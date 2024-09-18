"use client";

import { useStatus } from "@/context/StatusContext";
import { getSession } from "@/lib/axios/authService";

function Home() {
  const { isPending, setStatus, startTransition, status } = useStatus();

  const getSession123 = () => {
    startTransition(async () => {
      const response = await getSession();
      setStatus({
        message: response.message,
        statusCode: response.statusCode,
      });
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
    </div>
  );
}

export default Home;
