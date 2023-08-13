export interface ApiError {
  errorcode: string;
  error: string;
  status: number;
  devmessage?: {
    class: string;
    code: number;
    message: string;
    location: string;
    line: number;
  }
};

export interface ApiErrorResponse {
  error: ApiError;
  headers: any;
  message: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
};