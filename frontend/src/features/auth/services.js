import { authClient, employeeClient, adminClient } from './clients'

// Auth services
export const loginUserService = async (credentials) => {
  const res = await authClient.post('/login', credentials)
  return {}// expected { user, token }
}

export const logoutUserService = async () => {
  await authClient.post('/logout')
}

export const getCurrentUserService = async () => {
  const res = await authClient.get('/me')
  return res.data
}

// Employee services
export const getEmployeeService = async (id) => {
  const res = await employeeClient.get(`/${id}`)
  return res.data
}

// Admin services
export const createAdminService = async (payload) => {
  const res = await adminClient.post('/create', payload)
  return res.data
}
