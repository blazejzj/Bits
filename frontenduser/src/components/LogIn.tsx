import { ChangeEvent, useState, FormEvent } from "react";

function LogIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
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
