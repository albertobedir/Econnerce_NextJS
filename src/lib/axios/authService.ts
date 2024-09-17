import { AuthSchemas } from "@/schemas/auth";
import * as zod from "zod";
import { api, handleAxiosError } from ".";
import { ResponsePromise, Tokens } from "@/types/axios";

export const registerRequest = async (
  values: zod.infer<typeof AuthSchemas>
): Promise<ResponsePromise> => {
  try {
    const response = await api.post("/auth/register", values);
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
    console.log(access_token);
    console.log(refresh_token);
    return {
      message: response.data.message,
      statusCode: response.status,
    };
  } catch (error) {
    return handleAxiosError(error);
  }
};
