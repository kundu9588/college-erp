import authReducer from './reducers';

export const reducer = authReducer;

export const selectAuthStatus = (state: { auth: any }) => state.auth.status;
export const selectAuthError = (state: { auth: any }) => state.auth.error;
export const selectIsAuthenticated = (state: { auth: any }) => state.auth.isAuthenticated;
export const selectAccessToken = (state: { auth: any }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: any }) => state.auth.refreshToken;
