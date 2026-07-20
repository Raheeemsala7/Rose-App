declare type SuccessResponse<T> = {
  status: true;
  code: number;
  message?: string;
  payload: T;
};
declare type IErrorResponse = {
  status: false;
  code: number;
  message?: string;
  errors?: Array<{
    path: string;
    message: string;
  }>;
};

declare type ApiResponse<T> = SuccessResponse<T> | IErrorResponse;
