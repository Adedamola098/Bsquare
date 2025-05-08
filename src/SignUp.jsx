import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SignUp = ({ setUser }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Simulated signup with validation
      const validEmails = ['adedamola@example.com'];
      if (validEmails.includes(form.email)) {
        throw new Error('Email already in use');
      }
      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create new user profile
      const newUser = {
        name: form.username,
        email: form.email,
        nickname: form.username.toLowerCase().replace(/\s+/g, '.'),
        role: 'Customer',
        location: 'Not specified',
        phone: 'Not specified',
      };
      setUser(newUser);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Create Account | Bsquare</title>
        <meta
          name="description"
          content="Sign up for an account on Your Store Name to shop for gaming accessories and more."
        />
        <meta
          name="keywords"
          content="sign up, create account, online store, gaming accessories, register"
        />
        <meta name="author" content="Bsquare" />
      </Helmet>

      <img src="g.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-20 max-w-md w-full bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            placeholder="Enter your email"
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
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 bg-gray-100/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold transition transform hover:scale-105 shadow-md ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;