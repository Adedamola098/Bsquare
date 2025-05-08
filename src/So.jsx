import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const So = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
            onSubmit={(e) => {
                e.preventDefault()
                onsubmit(handleSubmit)
                axios.post('', {name, email, password, confirmPassword})
                .then( response => console.log(response) )                    .
                catch( error => console.log(error) )    
            }}
            className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                <button
                    type="button" // No functionality attached
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Sign Up
                </button>
            <p>already have an account <Link to={"/login"} className='text-blue-700'>LogIn</Link></p>
            </form>
        </div>
    );
};

export default So;
