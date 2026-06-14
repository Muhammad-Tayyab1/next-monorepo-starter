export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  timestamp: string;
}
