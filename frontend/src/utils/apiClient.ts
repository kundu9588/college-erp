// src/utils/apiClient.ts
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiResponse } from '../features/auth/model';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const createApiClient = (opts?: { baseURL?: string }): AxiosInstance => {
  const client = axios.create({
    baseURL: opts?.baseURL ?? baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Attach token before request
  client.interceptors.request.use((config) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle expired token
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      // If token expired & not retried yet
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          // wait for refresh to complete
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          processQueue(null, null);
          isRefreshing = false;
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
            `${baseURL}/auth/refresh`,
            { refreshToken }
          );

          const newAccessToken = data.data?.accessToken;
          const newRefreshToken = data.data?.refreshToken;

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }
            client.defaults.headers['Authorization'] = 'Bearer ' + newAccessToken;
            processQueue(null, newAccessToken);
            return client(originalRequest);
          } else {
            processQueue(new Error('No new access token'), null);
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const authClient = createApiClient();
