/**
 * Login Page
 * 
 * Handles user authentication via OTP or Google login
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import ErrorStory from '../components/ErrorStory';
import { sendOTP, verifyOTP, signInWithGoogle } from '../lib/supabase';
import { getErrorStory } from '../lib/errorStories';

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorStory, setErrorStory] = useState(null);

  // Handle phone number form submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrorStory(null);
    setIsLoading(true);

    try {
      // Validate phone number
      if (!phoneNumber || phoneNumber.length < 10) {
        throw new Error('Please enter a valid phone number');
      }

      // Format phone number to E.164 format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

      // Send OTP
      const response = await sendOTP(formattedPhone);

      if (response.success) {
        setStep('otp');
      } else {
        // Show error story for phone not found
        setErrorStory(getErrorStory('auth', 'phoneNotFound'));
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification form submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setErrorStory(null);
    setIsLoading(true);

    try {
      // Validate OTP
      if (!otp || otp.length < 4) {
        throw new Error('Please enter a valid OTP');
      }

      // Format phone number
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;

      // Verify OTP
      const response = await verifyOTP(formattedPhone, otp);

      if (response.success) {
        // Save token to localStorage
        if (response.data.session?.access_token) {
          localStorage.setItem('authToken', response.data.session.access_token);
        }

        // Redirect to home page or the page they were trying to access
        const redirectTo = router.query.redirectTo || '/';
        router.push(redirectTo);
      } else {
        // Show error story for invalid OTP
        setErrorStory(getErrorStory('auth', 'invalidOTP'));
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // The redirect is handled by Supabase Auth
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle error story actions
  const handleErrorAction = (action) => {
    switch (action) {
      case 'retry':
        setError(null);
        setErrorStory(null);
        break;

      case 'resendOTP':
        setStep('phone');
        setError(null);
        setErrorStory(null);
        break;

      case 'googleLogin':
        handleGoogleLogin();
        break;

      case 'createAccount':
        // Just continue with OTP flow, as it will create an account
        setStep('otp');
        setError(null);
        setErrorStory(null);
        break;

      default:
        console.log(`Action ${action} not implemented yet`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/">
            <a className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-meat-800 to-meat-600">
              Aamis
            </a>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 'phone' ? 'Sign in to your account' : 'Enter verification code'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {step === 'phone' ? (
            'Enter your phone number to receive a verification code'
          ) : (
            `We've sent a code to ${phoneNumber}`
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Show error story if available */}
          {errorStory && (
            <ErrorStory
              story={errorStory}
              onAction={handleErrorAction}
            />
          )}

          {/* Phone number form */}
          {step === 'phone' && !errorStory && (
            <form className="space-y-6" onSubmit={handlePhoneSubmit}>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input py-3 pl-12 block w-full"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                {error && !errorStory && (
                  <p className="mt-2 text-sm text-meat-600">{error}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending code...' : 'Send verification code'}
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* OTP verification form */}
          {step === 'otp' && !errorStory && (
            <form className="space-y-6" onSubmit={handleOtpSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Verification code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="otp"
                    className="form-input py-3 block w-full text-center tracking-widest text-lg"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={isLoading}
                    required
                  />
                </div>
                {error && !errorStory && (
                  <p className="mt-2 text-sm text-meat-600">{error}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify code'}
                </button>
              </div>

              <div className="text-sm text-center">
                <button
                  type="button"
                  className="font-medium text-primary-600 hover:text-primary-500"
                  onClick={() => setStep('phone')}
                >
                  Use a different phone number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// This page uses a custom layout without the header and footer
Login.getLayout = function getLayout(page) {
  return page;
};
