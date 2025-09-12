// model.ts
export interface User {
  userId: string;
  institutionId?: string;
  email?: string;
  name?: string;
  roles: string[]; // now stores backend roles
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: {
    details?: string;
    status?: number;
    code?: string;
  };
}
