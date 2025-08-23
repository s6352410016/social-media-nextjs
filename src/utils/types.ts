export interface CommonResponse {
  status: number;
  success: boolean;
  message: string;
  data?: Object | string | number | boolean | Array<Object | string | number | boolean>;
}