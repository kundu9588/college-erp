'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { loginUserAsync } from '../features/auth/services';
import {
  selectAuthStatus,
  selectIsAuthenticated,
  selectAuthError,
} from '../features/auth/slice';
import type { RootState, AppDispatch } from '../store/store';

const SignInLayer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const status = useSelector((state: RootState) => selectAuthStatus(state));
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const error = useSelector((state: RootState) => selectAuthError(state));

  // Redirect after authentication
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/SuperAdmin/Dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        loginUserAsync({ email, password, rememberMe })
      ).unwrap();
      console.log('Logged in user:', result.user); // if you need it right away
    } catch {
      // Error already in Redux state
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="Auth illustration" />
        </div>
      </div>

      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <Link href="/" className="mb-40 max-w-290-px">
            <img src="assets/images/logo.png" alt="Logo" />
          </Link>
          <h4 className="mb-12">Sign In to your Account</h4>
          <p className="mb-32 text-secondary-light text-lg">
            Welcome back! Please enter your details
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <span
                className={`toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light ${
                  showPassword ? 'ri-eye-off-line' : 'ri-eye-line'
                }`}
                onClick={() => setShowPassword((p) => !p)}
              />
            </div>

            {/* Error block */}
            {error && (
              <div className="alert alert-danger mb-16">
                <strong>{error.message}</strong>
                {error.code && <div>Code: {error.code}</div>}
                {error.status && <div>Status: {error.status}</div>}
                {/* If your ApiError contains details */}
                {(error as any).details && (
                  <div>Details: {(error as any).details}</div>
                )}
              </div>
            )}

            <div className="d-flex justify-content-between gap-2 mb-12">
              <div className="form-check style-check d-flex align-items-center">
                <input
                  className="form-check-input border border-neutral-300"
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label ms-2" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-primary-600 fw-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-16"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing In…' : 'Sign In'}
            </button>

            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Don’t have an account?{' '}
                <Link href="/sign-up" className="text-primary-600 fw-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
