import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      console.log('Attempting login with:', { email, password });

      // Simulated login with hardcoded credentials
      const validEmail = 'adedamola@example.com';
      const validPassword = 'password123';
      if (email === validEmail && password === validPassword) {
        const userProfile = {
          name: 'Adedamola Isreal',
          email: validEmail,
          nickname: 'dml.dev',
          role: 'Web Developer',
          location: 'Lagos, Nigeria',
          phone: '+234 123 456 7890',
        };
        setUser(userProfile);
        navigate('/home');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  const handleGoogleLogin = () => {
    // Simulated Google login with hardcoded profile
    const userProfile = {
      name: 'Adedamola Isreal',
      email: 'adedamola@example.com',
      nickname: 'dml.dev',
      role: 'Web Developer',
      location: 'Lagos, Nigeria',
      phone: '+234 123 456 7890',
    };
    setUser(userProfile);
    navigate('/home');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    try {
      console.log('Sending reset link to:', resetEmail);
      // Simulated reset password logic
      if (resetEmail === 'adedamola@example.com') {
        setResetSuccess('Password reset link sent to your email!');
        setTimeout(() => setShowResetModal(false), 2000);
      } else {
        throw new Error('Email not found');
      }
    } catch (error) {
      console.error('Reset error:', error);
      setResetError(error.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Login to Your Account | Bsquare</title>
        <meta
          name="description"
          content="Login to your account at Your Store Name to shop, view orders, and more."
        />
        <meta
          name="keywords"
          content="login, user login, online store, gaming accessories, account login"
        />
        <meta name="author" content="Bsquare" />
      </Helmet>

      <img src="/g.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-20 max-w-md w-full bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Log In
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-md hover:from-blue-700 hover:to-indigo-700"
        >
          Log In
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-md hover:from-red-700 hover:to-red-800 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.649,9.586-11.453h-9.586V10.239z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
          <form
            onSubmit={handleResetPassword}
            className="max-w-md w-full bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Reset Password
            </h3>

            {resetError && (
              <p className="text-red-500 text-sm text-center">{resetError}</p>
            )}
            {resetSuccess && (
              <p className="text-green-500 text-sm text-center">{resetSuccess}</p>
            )}

            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="reset-email"
                name="reset-email"
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="py-2 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-md hover:from-blue-700 hover:to-indigo-700"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;