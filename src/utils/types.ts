export interface ICommonResponse {
  status: number;
  success: boolean;
  message: string | string[];
  data?:
    | Object
    | string
    | any[];
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
  id: string;
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
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
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

enum NotificationType {
  LIKE,
  COMMENT,
  FOLLOW,
  SHARE,
  POST,
  REPLY,
}

export interface INotify {
  id: string;
  type: NotificationType;
  senderId: string;
  receiverId: string;
  postId?: string;
  commentId?: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: Omit<IUser, "provider">;
}