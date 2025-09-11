export interface User {
  userId: string;
  institutionId?: string;
  email?: string;
  name?: string;
  roles: string[];
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
