import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
}

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
                if (!response.ok) {
                    throw new Error("Can't sign in user.");
                }
                const data: User = await response.json();
                setUser(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error("Failed logging user in.");
            }
            const user = await response.json();
            setUser(user);
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    "Something went wrong with loggin user in.",
                    error.message
                );
                setUser(null);
            }
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Something went wrong logging user out.");
            }
            setUser(null);
        } catch (error) {
            if (error instanceof Error) {
                console.error(
                    "Something went wrong with loggin user out.",
                    error.message
                );
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
