import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                throw new Error("Couldn't register user.");
            }
            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Something went wrong." + error.message);
            }
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function renderRegisterForm() {
        return (
            <div>
                <h1>Register new user</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register now</button>
                </form>
            </div>
        );
    }

    return renderRegisterForm();
}

export default RegisterUser;
