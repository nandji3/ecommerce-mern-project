import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isAuth, logout } = useAuth();


    return (
        <nav className="bg-teal-600 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">MERN Shop</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Products</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                {!isAuth && <Link Link to="/register" className="hover:underline">Register</Link>}
                {isAuth && <button className="cursor-pointer" onClick={logout} >Logoout</button>}
            </div>
        </nav >
    );
}