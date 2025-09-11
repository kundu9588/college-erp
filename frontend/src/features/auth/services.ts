import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, ApiError } from './model';
import { setLoading, setTokens, setError, clearError } from './actions';
import { RootState } from '../../store/store';
import { authClient } from '../../utils/apiClient';

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    roles: string[];
    userId?: string;
    institutionId?: string;
    email?: string;
    name?: string;
  };
  error: any;
}

// Return the user but store only tokens in Redux
export const loginUserAsync = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: ApiError; state: RootState }
>(
  'auth/loginUserAsync',
  async ({ email, password, rememberMe }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));

    try {
      // 🔹 DEMO LOGIN (local check)
      if (email === 'uditdhiman91@gmail.com' && password === '11111') {
        const demoUser: User = {
          userId: 'demo-user-1',
          institutionId: 'demo-institution-123',
          email,
          name: 'Demo User',
          roles: ['admin'],
        };

        const accessToken = 'demo-access-token';
        const refreshToken = 'demo-refresh-token';

        dispatch(clearError());
        dispatch(setTokens({ accessToken, refreshToken }));

        return { user: demoUser, accessToken, refreshToken };
      }

      // 🔹 REAL API CALL (fallback)
      const { data: res } = await authClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      if (!res.success) {
        throw new Error(res.error?.message || 'Login failed');
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
        roles,
      };

      dispatch(clearError());
      dispatch(setTokens({ accessToken, refreshToken }));

      return { user: normalizedUser, accessToken, refreshToken };
    } catch (error: any) {
      const apiError: ApiError = {
        message:
          error.response?.data?.message || error.message || 'Login failed',
        status: error.response?.status ?? 400,
        code: error.response?.data?.code || 'UNKNOWN_ERROR',
      };
      dispatch(setError(apiError));
      return rejectWithValue(apiError);
    }
  }
);
