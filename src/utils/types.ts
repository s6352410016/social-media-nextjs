export interface ICommonResponse {
  status: number;
  success: boolean;
  message: string;
  data?: Object | string | number | boolean | Array<Object | string | number | boolean>;
}

export type ApiBody<T> = T;

export interface IOtpBody {
  email: string;
  otp: string;
}