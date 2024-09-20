export type User = {
  id: string;
  name: string;
  email: string;
  userRole: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};
