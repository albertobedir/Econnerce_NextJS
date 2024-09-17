export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icons?: {
    open: React.ReactNode;
    close: React.ReactNode;
  };
  iconPos?: "LEFT" | "RIGHT";
  label?: string;
  id: string;
  error?: string;
};
