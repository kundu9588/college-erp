'use client'; // <-- Add this at the very top

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectAccessToken,
  selectRefreshToken,
  selectAuthStatus,
  selectAuthError,
} from '../../features/auth/slice';

const Page = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (!isAuthenticated) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h1>Auth State</h1>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Access Token:</strong> {accessToken}</p>
      <p><strong>Refresh Token:</strong> {refreshToken}</p>
      {error && (
        <p className="text-danger">
          Error: {error.message} (Code: {error.code})
        </p>
      )}
    </div>
  );
};

export default Page;
