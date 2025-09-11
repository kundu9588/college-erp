module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_EMPLOYEE_API_URL: process.env.NEXT_PUBLIC_EMPLOYEE_API_URL,
    NEXT_PUBLIC_ADMIN_API_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
  },
};