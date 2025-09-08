import { createAction } from '@reduxjs/toolkit'

export const loginStart = createAction('auth/loginStart')
export const loginSuccess = createAction('auth/loginSuccess')
export const loginFailure = createAction('auth/loginFailure')

export const logout = createAction('auth/logout')
