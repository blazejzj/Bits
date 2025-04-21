import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { User } from "../types/User";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch("http://localhost:3000/profile", {
                    credentials: "include",
                });
                if (response.ok) {
                    const data: User = await response.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, []);

    const login = async (username: string, password: string) => {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        const body = await response.json();

        if (!response.ok) {
            const errMsg = body.errors?.[0]?.msg || body.msg || "Login failed";

            throw new Error(errMsg);
        }

        const profileRes = await fetch("http://localhost:3000/profile", {
            credentials: "include",
        });
        if (!profileRes.ok) {
            throw new Error("Failed to load user profile after login");
        }
        const userData: User = await profileRes.json();
        setUser(userData);
    };

    const logout = async () => {
        const response = await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Something went wrong logging out.");
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
