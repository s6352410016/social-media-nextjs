"use server";

import { RegisterSchema } from "@/utils/validations/auth";
import { axiosInstance } from "@/utils/axios-instance";
import { CommonResponse } from "../utils/types";
import { isAxiosError } from "axios";

export async function registerUser(body: RegisterSchema): Promise<CommonResponse> {
  try {
    const { data } = await axiosInstance.post<CommonResponse>("auth/register", body);
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred",
    }
  }
}
