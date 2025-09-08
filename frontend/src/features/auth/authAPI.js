// simple fetch helpers

export const loginUser = async (credentials) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json(); // expect { user: {...} }
};

export const logoutUser = async () => {
  await fetch('/api/logout', { method: 'POST' });
};
