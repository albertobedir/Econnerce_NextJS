import { ResponsePromise } from "@/types/axios";
import { setTokens } from "@/utils/setTokens";
import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const access_token = setTokens({ method: "get", at: true })?.accessToken;
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
    if (response.status === 401 && !config._retry) {
      config._retry = true;
      const rt = setTokens({ method: "get", rt: true })?.refreshToken;
      if (rt) {
        try {
          const response = await api.get("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${rt}`,
            },
          });

          const { access_token, refresh_token } = response.data;
          setTokens({ method: "set", at: access_token, rt: refresh_token });

          config._retry = false;
          api.defaults.headers["Authorization"] = `Bearer ${access_token}`;
          return api(config);
        } catch (error) {
          config._retry = false;
          setTokens({ method: "remove", at: true, rt: true });
          window.location.href = "/auth/login";
        }
      } else {
        setTokens({ method: "remove", at: true, rt: true });
        window.location.href = "/auth/login";
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
