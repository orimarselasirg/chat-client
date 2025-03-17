import { createContext, useState, useMemo } from "react";
import { LOGIN_MESSAGE } from "../utils/constant";

export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (loginRequest: { email: string, password: string }) => Promise<void>;
    register: (registerRequest: { name: string, email: string, password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => { },
});


export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async ({ email, password }: { email: string, password: string }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || LOGIN_MESSAGE.LOGIN_ERROR_INVALID_CREDENTIALS);
            }
            return {
                ...data.user,
                token: data.token
            };

        } catch (error: any) {
            throw new Error(error.message || LOGIN_MESSAGE.LOGIN_ERROR);
        }
    }

    const login = async (loginRequest: { email: string, password: string }) => {
        const user = await fetchUser(loginRequest);
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    const register = async (registerRequest: { name: string, email: string, password: string }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerRequest),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || LOGIN_MESSAGE.REGISTER_ERROR);
            }

            setUser({
                ...data.user,
                token: data.token
            });

        } catch (error: any) {
            throw new Error(error.message || LOGIN_MESSAGE.REGISTER_ERROR);
        }
    };

    const memoizedValue = useMemo(() => ({
        user,
        login,
        register,
        logout
    }), [user, login, register, logout]);

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
};
