import { ChangeEvent, useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
            <div>
                <h1>Log in</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="username"
                        id="username"
                        value={formData.username}
                        required
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        id="password"
                        value={formData.password}
                        required
                    />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }

    return renderLogInForm();
}

export default LogIn;
