import { axiosInstance } from "@/utils/axios-instance";
import { ApiBody, ICommonResponse } from "../utils/types";
import { AxiosRequestConfig, isAxiosError } from "axios";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options"
  | "postForm"
  | "putForm"
  | "patchForm";

export async function callApi<TBody extends Object>(
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig<any>,
  body?: ApiBody<TBody>
): Promise<ICommonResponse> {
  try {
    const { data } = await axiosInstance[method]<ICommonResponse>(
      url,
      body,
      config,
    );
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }

    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
