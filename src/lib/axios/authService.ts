import { AuthSchemas } from "@/schemas/auth";
import * as zod from "zod";
import { api, handleAxiosError } from ".";
import { ResponsePromise, Tokens } from "@/types/axios";
import { User } from "@/types/user/user";
import { setTokens } from "@/utils/setTokens";

export const registerRequest = async (
  values: zod.infer<typeof AuthSchemas>
): Promise<ResponsePromise> => {
  try {
    const response = await api.post<ResponsePromise & Tokens>(
      "/auth/register",
      values
    );
    const { access_token, refresh_token } = response.data.tokens;
    setTokens({ method: "set", at: access_token, rt: refresh_token });
    return {
      message: response.data.message,
      statusCode: response.status,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const loginRequest = async (
  values: zod.infer<typeof AuthSchemas>
): Promise<ResponsePromise> => {
  try {
    const response = await api.post<ResponsePromise & Tokens>(
      "/auth/login",
      values
    );
    const { access_token, refresh_token } = response.data.tokens;
    setTokens({ method: "set", at: access_token, rt: refresh_token });
    return {
      message: response.data.message,
      statusCode: response.status,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const logoutRequest = async () => {
  try {
    await api.get("/auth/logout");
  } catch (error) {
    throw new Error("An error occurred during logout. Please try again.");
  } finally {
    setTokens({ method: "remove", at: true, rt: true });
  }
};

export const getSession = async (): Promise<
  (ResponsePromise & { user: User }) | ResponsePromise
> => {
  try {
    const response = await api.get("/auth/get-session");

    const user: User = {
      ...response.data,
    };

    return {
      message: response.statusText,
      statusCode: response.status,
      user,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};
