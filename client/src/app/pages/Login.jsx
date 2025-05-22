import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            login(res.data.token);
            navigate('/products'); // Redirect after login
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="w-full max-w-sm mx-auto mt-20 p-4 border-1 border-gray-300 rounded-md rbg-white shadow-xl bg-white"
        >
            <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border text-sm rounded mb-3"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border text-sm rounded mb-3"
                required
            />

            <button
                type="submit"
                className="w-full bg-teal-600 text-white text-sm py-2 rounded hover:bg-teal-700 transition"
            >
                Login
            </button>

            <p className="mt-3 text-xs text-center text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-teal-600 hover:underline">
                    Register
                </Link>
            </p>
        </form>
    );
}
