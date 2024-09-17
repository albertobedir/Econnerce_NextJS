import { StatusProvider } from "./StatusProvider";

function Provider({ children }: { children: React.ReactNode }) {
  return <StatusProvider>{children}</StatusProvider>;
}

export default Provider;
