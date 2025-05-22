import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            await axiosInstance.post('/auth/register', { email, password });
            setError('');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError('User already exists or server error');
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="w-full max-w-sm mx-auto mt-20 p-4 border border-gray-300 rounded-md bg-white shadow-xl"
        >
            <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">Register</h2>

            {error && (
                <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
            )}

            <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border text-sm rounded mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border text-sm rounded mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border text-sm rounded mb-3"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
            />

            <button
                type="submit"
                className="w-full bg-teal-600 text-white text-sm py-2 rounded hover:bg-teal-700 transition"
            >
                Register
            </button>

            <p className="mt-3 text-xs text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-teal-600 hover:underline">
                    Login
                </Link>
            </p>
        </form>
    );
}
