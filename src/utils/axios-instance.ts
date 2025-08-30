import { ICommonResponse } from "./types";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<AxiosResponse<ICommonResponse, any>> | null = null;

axiosInstance.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshInstance
        .post<ICommonResponse>("auth/refresh-token")
        .finally(() => {
          refreshPromise = null;
        });
    }

    const { data } = await refreshPromise;
    if (data.success) {
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }

  return Promise.reject(error);
});

export default axiosInstance;
