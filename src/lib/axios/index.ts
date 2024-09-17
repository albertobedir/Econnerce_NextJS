import { ResponsePromise } from "@/types/axios";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleAxiosError = (error: unknown): ResponsePromise => {
  if (!axios.isAxiosError(error)) {
    return {
      message: "An unexpected error occurred.",
      statusCode: 500,
    };
  }

  const { response } = error;

  if (response) {
    return {
      message: response.data?.message || getDefaultMessage(response.status),
      statusCode: response.status,
    };
  } else if (error.request) {
    return {
      message: "Unable to reach the server.",
      statusCode: 500,
    };
  } else {
    return {
      message: "An error occurred.",
      statusCode: 500,
    };
  }
};

const getDefaultMessage = (status: number): string => {
  switch (status) {
    case 400:
      return "Bad request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not found";
    case 500:
      return "Internal server error";
    default:
      return "Unknown error";
  }
};
