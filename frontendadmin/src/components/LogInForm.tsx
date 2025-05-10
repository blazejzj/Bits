import { useState, type ChangeEvent, type FormEvent } from "react";

interface LogInFormProps {
    handleLogIn: (username: string, password: string) => void;
    clearError: () => void;
}
export default function LogInForm({ handleLogIn, clearError }: LogInFormProps) {
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: "",
    });

    function changeLogInFormData(e: ChangeEvent<HTMLInputElement>) {
        clearError();
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        clearError();
        handleLogIn(loginFormData.username, loginFormData.password);
        setLoginFormData({
            username: "",
            password: "",
        });
    }

    return (
        <form className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="username" className="mb-1 font-medium">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={loginFormData.username}
                    onChange={changeLogInFormData}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
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
                    value={loginFormData.password}
                    onChange={changeLogInFormData}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
            </div>

            <button
                onClick={(e) => handleSubmit(e)}
                className="w-full bg-gray-700 text-white font-semibold rounded-md py-2 hover:bg-gray-800 transition cursor-pointer"
            >
                Log in
            </button>
        </form>
    );
}
