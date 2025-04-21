import { ChangeEvent, useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

function LogIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await login(formData.username, formData.password);
        navigate("/");
    }

    function renderLogInForm() {
        return (
            <div className="container bg-white rounded-md p-5 flex flex-col items-center gap-3 justify-center">
                <h1 className="text-3xl font-bold text-cyan-700">Log in</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-3 h-96"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username">Username </label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            required
                            className="border-1 border-gray-300 rounded-md p-1"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            className="border-1 border-gray-300 rounded-md p-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-700 text-white font-bold rounded-md p-2"
                    >
                        Log in
                    </button>
                </form>
                <p>
                    Don't have an account? Register{" "}
                    <NavLink to="/register" className="text-cyan-700 font-bold">
                        Here
                    </NavLink>
                </p>
            </div>
        );
    }

    return renderLogInForm();
}

export default LogIn;
