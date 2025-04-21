import { ChangeEvent, useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";

function LogIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        try {
            await login(formData.username, formData.password);
            navigate("/");
        } catch (err) {
            let msg = "Something went wrong";
            if (err instanceof Error) {
                msg = err.message;
            }

            setError(msg);
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold text-cyan-700 text-center">
                    Log in
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-700 text-white font-semibold rounded-md py-2 hover:bg-cyan-800 transition"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <NavLink
                        to="/register"
                        className="text-cyan-700 font-medium hover:underline"
                    >
                        Register here
                    </NavLink>
                </p>
            </div>
        </div>
    );
}

export default LogIn;
