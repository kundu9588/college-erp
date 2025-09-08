import { createApiClient } from './apiClient'

export const authClient = createApiClient(process.env.NEXT_PUBLIC_AUTH_API_URL)
export const employeeClient = createApiClient(process.env.NEXT_PUBLIC_EMPLOYEE_API_URL)
export const adminClient = createApiClient(process.env.NEXT_PUBLIC_ADMIN_API_URL)
