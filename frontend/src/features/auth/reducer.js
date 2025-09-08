import { createReducer } from '@reduxjs/toolkit'
import { loginStart, loginSuccess, loginFailure, logout } from './actions'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginStart, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(loginSuccess, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
    })
    .addCase(loginFailure, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    .addCase(logout, (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    })
})

export default authReducer
