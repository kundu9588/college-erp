// src/utils/apiClient.ts
import axios from 'axios';

// Always read from NEXT_PUBLIC_API_BASE_URL
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const authClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// If you store tokens, automatically attach them
authClient.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
