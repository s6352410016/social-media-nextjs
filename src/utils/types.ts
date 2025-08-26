export interface ICommonResponse {
  status: number;
  success: boolean;
  message: string;
  data?: Object | string | number | boolean | Array<Object | string | number | boolean>;
}

export type ApiBody<T> = T;

export interface IOtpBody {
  otp: string;
}

export interface IForgotPasswordPayload {
  email: string;
  sendEmailVerified: boolean;
}

export interface IResetPasswordPayload {
  email: string;
  otpVerified: boolean;
}