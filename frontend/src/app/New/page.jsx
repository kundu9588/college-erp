'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/slice';

const Page = () => {
  const user = useSelector(selectUser);
  const [hasMounted, setHasMounted] = useState(false);

  // Wait until client is mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!hasMounted) return null;

  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>ID:</strong> {user.userId}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Page;
