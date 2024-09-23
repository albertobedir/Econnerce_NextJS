import { SessionProvider } from "./SessionProvider";
import { StatusProvider } from "./StatusProvider";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StatusProvider>
      <SessionProvider>{children}</SessionProvider>
    </StatusProvider>
  );
}

export default Provider;
