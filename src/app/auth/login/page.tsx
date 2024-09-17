"use client";
import AuthForm from "@/components/auth/AuthForm";
import { useStatus } from "@/context/StatusContext";
import { loginRequest } from "@/lib/axios/authService";
import { AuthSchemas } from "@/schemas/auth";
import Link from "next/link";
import React from "react";
import * as zod from "zod";

export default function Page() {
  const { startTransition, setStatus } = useStatus();
  const handleLogin = (values: zod.infer<typeof AuthSchemas>) => {
    startTransition(async () => {
      try {
        const response = await loginRequest(values);
        setStatus({
          message: response.message,
          statusCode: response.statusCode,
        });
      } catch (error) {
        setStatus({ message: "Bir hata oluştu.", statusCode: 500 });
      }
    });
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      type="login"
      title={
        <h1 className="font-medium text-2xl">
          It&apos;s good to see you again.
        </h1>
      }
      link={
        <span>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            create now!
          </Link>
        </span>
      }
    />
  );
}
