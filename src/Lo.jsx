import React from 'react';
import { Link } from 'react-router-dom';

const Lo = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    type="button" // No functionality attached
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Login
                </button>
                <p>dont't  have an account yet <Link to={"/register"} className='text-blue-700'>SignUp</Link></p>
            </form>
        </div>
    );
};

export default Lo;
