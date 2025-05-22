import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
    };

    useEffect(() => {
        setIsAuth(!!localStorage.getItem('token'));
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
