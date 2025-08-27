export interface ICommonResponse {
  status: number;
  success: boolean;
  message: string;
  data?:
    | Object
    | string
    | number
    | boolean
    | Array<Object | string | number | boolean>;
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

export interface IErrorTokenPayload {
  socialAuthVerified: boolean;
}

export interface IAtPayload {
  id: number;
  authVerified: boolean;
}

export enum Role {
  USER,
  ADMIN,
}

export enum ProviderType {
  LOCAL,
  GOOGLE,
  GITHUB,
}

export interface IProvider {
  id: number;
  providerType: ProviderType;
  providerId?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: number;
  fullname: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  profileUrl: string;
  profileBackgroundUrl: string;
  info: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  provider: IProvider;
}
