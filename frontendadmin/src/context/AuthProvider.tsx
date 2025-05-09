import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getUser() {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/profile`,
                    {
                        method: "GET",
                        headers: { "Content-type": "application/json" },
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    setUser(null);
                } else {
                    const body = await response.json();
                    setUser(body);
                }
            } catch (err) {
                if (err instanceof Error) {
                    setUser(null);
                    setLoading(false);
                }
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, []);

    async function login(login: string, password: string) {
        const req = {
            username: login,
            password: password,
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    method: "POST",
                    body: JSON.stringify(req),
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                }
            );
            if (!response.ok) {
                setLoading(false);
            }
        } catch (err) {
            if (err instanceof Error) {
                setUser(null);
            }
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                if (userData.role === "ADMIN") {
                    setUser(userData);
                } else {
                    logout();
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err);
            }
        }
    }

    async function logout() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            if (response.ok) {
                setUser(null);
            }
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
