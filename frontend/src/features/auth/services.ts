// services.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, ApiError, ApiResponse } from './model';
import { setLoading, setTokens, setError, clearError, resetAuth } from './actions';
import { RootState } from '../../store/store';
import { authClient } from '../../utils/apiClient';

interface LoginData {
  accessToken: string;
  refreshToken: string;
  roles: string[];
  userId?: string;
  institutionId?: string;
  email?: string;
  name?: string;
}

// 🔹 Real login API
export const loginUserAsync = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: ApiError; state: RootState }
>(
  'auth/loginUserAsync',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      // Call backend login
      const { data: res } = await authClient.post<ApiResponse<LoginData>>(
        '/auth/login',
        { email, password }
      );

      if (!res.success || !res.data) {
        throw new Error(res.error?.details || res.message || 'Login failed');
      }

      const {
        accessToken,
        refreshToken,
        roles,
        userId,
        institutionId,
        email: userEmail,
        name,
      } = res.data;

      const normalizedUser: User = {
        userId: userId ?? '',
        institutionId,
        email: userEmail,
        name,
        roles: roles ?? [],
      };

      dispatch(clearError());
      dispatch(setTokens({ accessToken, refreshToken }));

      return { user: normalizedUser, accessToken, refreshToken };
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Login failed',
        status: error.response?.status ?? 400,
        code: error.response?.data?.code || 'UNKNOWN_ERROR',
      };
      dispatch(setError(apiError));
      return rejectWithValue(apiError);
    }
  }
);

// 🔹 Logout thunk if needed
export const logoutUserAsync = createAsyncThunk(
  'auth/logoutUserAsync',
  async (_, { dispatch }) => {
    dispatch(resetAuth());
    // optional backend logout here
  }
);
