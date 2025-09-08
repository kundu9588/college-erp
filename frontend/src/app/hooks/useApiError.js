'use client'
import { useState } from 'react'

export default function useApiError() {
  const [error, setError] = useState(null)

  const handleApiError = (err) => {
    // If Axios error:
    if (err.response) {
      setError(err.response.data?.message || 'Server error')
    } else if (err.request) {
      setError('No response from server')
    } else {
      setError(err.message)
    }
  }

  const clearError = () => setError(null)

  return { error, handleApiError, clearError }
}
