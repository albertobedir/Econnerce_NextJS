"use client";
import { useStatus } from "@/context/StatusContext";
import { AuthSchemas } from "@/schemas/auth";
import { InputProps } from "@/types/input";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import CInput from "../common/customInput";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthFormProps {
  onSubmit: (values: zod.infer<typeof AuthSchemas>) => void;
  title: React.ReactNode;
  link: React.ReactNode;
  type: "login" | "register";
}

export const fields: Array<
  Omit<InputProps, "id"> & { id: keyof zod.infer<typeof AuthSchemas> }
> = [
  { id: "email", placeholder: "Email", type: "email" },
  {
    id: "password",
    placeholder: "Password",
    type: "password",
    icons: { close: <EyeOff />, open: <Eye /> },
  },
];

const AuthForm = ({ link, onSubmit, title, type }: AuthFormProps) => {
  const { isPending, status, setStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<zod.infer<typeof AuthSchemas>>({
    resolver: zodResolver(AuthSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setStatus({ message: "", statusCode: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values: zod.infer<typeof AuthSchemas>) => {
    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full md:w-[60%] lg:w-[45%] xl:w-[35%] 2xl:w-[25%] flex flex-col gap-4 md:gap-6 p-[1rem]"
    >
      <h1>
        status: {status.message} code: {status.statusCode}
      </h1>
      {title}
      {fields.map((item, i) => (
        <CInput
          id={item.id}
          key={i}
          placeholder={item.placeholder}
          type={item.type}
          icons={item.icons}
          {...register(item.id)}
          error={errors[item.id]?.message}
        />
      ))}
      <Button disabled={isPending} type="submit">
        {isPending ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : (
          "Register"
        )}
      </Button>
      {link}
    </form>
  );
};

export default AuthForm;
