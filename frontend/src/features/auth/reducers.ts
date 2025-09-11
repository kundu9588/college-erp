import { createReducer } from '@reduxjs/toolkit';
import { ApiError } from './model';
import { setLoading, setTokens, setError, clearError, resetAuth } from './actions';
import { storage } from '../../utils/storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: ApiError | null;
  isAuthenticated: boolean;
}

const saved = storage.get<AuthState>('authState');

const initialState: AuthState = saved ?? {
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.status = action.payload ? 'loading' : 'idle';
    })
    .addCase(setTokens, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      storage.set('authState', state);
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
      state.isAuthenticated = false;
    })
    .addCase(clearError, (state) => {
      state.error = null;
    })
    .addCase(resetAuth, (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      storage.remove('authState');
    });
});

export default authReducer;
