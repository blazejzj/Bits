import React, { useState } from "react";

export default function RegisterForm() {
    const [renderRegisterNew, setRenderRegisterNew] = useState(true);

    const [registerFormData, setRegisterFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerFormData),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
    }

    function handleChangeFormType() {
        setRenderRegisterNew(!renderRegisterNew);
    }

    function handleChange(e) {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    }

    function renderLoginForm() {
        return (
            <div>
                <h1>Log in</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }

    function renderRegisterForm() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={registerFormData.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={registerFormData.email}
                        onChange={handleChange}
                    />

                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={registerFormData.username}
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={registerFormData.password}
                        onChange={handleChange}
                    />

                    <label htmlFor="confirmPassword">Confirm password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={registerFormData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            {renderRegisterNew ? renderRegisterForm() : renderLoginForm()}
            <button onClick={handleChangeFormType}>
                {renderRegisterNew
                    ? "Have an account? Log in here"
                    : "Don't have an account? Register here"}
            </button>
        </div>
    );
}
