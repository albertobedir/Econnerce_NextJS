"use client";
import AuthForm from "@/components/auth/AuthForm";
import { useStatus } from "@/context/StatusContext";
import { AuthSchemas } from "@/schemas/auth";
import Link from "next/link";
import React from "react";
import * as zod from "zod";

export default function Page() {
  const { startTransition, setStatus } = useStatus();
  const handleRegister = (values: zod.infer<typeof AuthSchemas>) => {
    startTransition(async () => {
      console.log(values);
      setStatus({ message: "deneme", statusCode: 200 });
    });
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      type="register"
      title={
        <h1 className="font-medium text-2xl">
          Welcome to the <span className="text-blue-500">NN</span>Store
        </h1>
      }
      link={
        <span>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            Log in now!
          </Link>
        </span>
      }
    />
  );
}
