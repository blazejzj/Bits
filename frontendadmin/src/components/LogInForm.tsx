import { useState, type ChangeEvent, type FormEvent } from "react";

interface LogInFormProps {
    handleLogIn: (username: string, password: string) => void;
}
export default function LogInForm({ handleLogIn }: LogInFormProps) {
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    function changeLogInFormData(e: ChangeEvent<HTMLInputElement>) {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        handleLogIn(loginFormData.username, loginFormData.password);
        setLoginFormData({
            username: "",
            password: "",
        });
    }

    return (
        <form className="">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                onChange={changeLogInFormData}
                value={loginFormData.username}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={changeLogInFormData}
                value={loginFormData.password}
                required
            />
            <button onClick={(e) => handleSubmit(e)} className="cursor-pointer">
                Log in
            </button>
        </form>
    );
}
