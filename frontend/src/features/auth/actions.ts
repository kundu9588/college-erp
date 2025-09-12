// actions.ts
import { createAction } from '@reduxjs/toolkit';
import { ApiError } from './model';

export const setLoading = createAction<boolean>('auth/setLoading');
export const setTokens = createAction<{ accessToken: string; refreshToken: string }>('auth/setTokens');
export const setError = createAction<ApiError | null>('auth/setError');
export const clearError = createAction('auth/clearError');

// logout action
export const resetAuth = createAction('auth/resetAuth');
