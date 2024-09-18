import { ResponsePromise } from "@/types/axios";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token && !config.url?.includes("refresh")) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const rt = localStorage.getItem("refresh_token");
      if (rt) {
        try {
          const response = await api.get("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${rt}`,
            },
          });
          const { access_token, refresh_token } = response.data;

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          originalRequest._retry = false;

          api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

          return api(originalRequest);
        } catch (error) {
          originalRequest._retry = false;

          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

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
