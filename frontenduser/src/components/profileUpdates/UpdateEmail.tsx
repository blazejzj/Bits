import { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type UpdateEmailProps = {
    setUpdateEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

type ErrorType = {
    msg: string;
};

function UpdateEmail({ setUpdateEmail }: UpdateEmailProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const [messages, setMessages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        email: "",
        authPassword: "",
    });
    const { setUser } = useAuth();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        setErrors([]);
        setMessages([]);
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/profile", {
                method: "PATCH",
                body: JSON.stringify(formData),
                credentials: "include",
                headers: { "Content-type": "application/json" },
            });
            if (!response.ok) {
                const body = await response.json();
                if (Array.isArray(body.msg)) {
                    body.msg.map((err: ErrorType) =>
                        setErrors([...errors, err.msg])
                    );
                } else {
                    setErrors([...errors, body.msg]);
                }
            } else {
                const body = await response.json();
                setMessages([...messages, body.msg]);
                setUser((prev) => ({
                    ...prev!,
                    email: formData.email,
                }));
                setFormData({
                    email: "",
                    authPassword: "",
                });
            }
        } catch (err) {
            if (err instanceof Error) {
                setErrors([
                    ...errors,
                    "Internal server issues. Couldn't update value.",
                ]);
            }
        }

        return <Navigate to="/profile" />;
    }

    function handleCancelUpdate() {
        setUpdateEmail(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);
        setMessages([]);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="shadow flex flex-col p-5 ml-5">
            {errors.length > 0 &&
                errors.map((errMsg, idx) => (
                    <div
                        key={idx}
                        className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2 mb-2"
                    >
                        {errMsg}
                    </div>
                ))}

            {messages.length > 0 &&
                messages.map((messagesMsg, idx) => (
                    <div
                        key={idx}
                        className="bg-green-100 text-green-700 border border-green-200 rounded-md px-4 py-2 mb-2"
                    >
                        {messagesMsg}
                    </div>
                ))}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium">
                        New email adress:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter new email adress..."
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="authPassword" className="font-medium">
                        To update your email you must enter your password
                    </label>
                    <input
                        type="password"
                        name="authPassword"
                        id="authPassword"
                        value={formData.authPassword}
                        onChange={handleChange}
                        placeholder="Confirmation password"
                        required
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                </div>
                <div className="flex gap-3 mt-3 ">
                    <button
                        type="submit"
                        className="font-semibold text-lg cursor-pointer gradient-wipe transition-[background-position,transform] duration-500 ease-in-out"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleCancelUpdate}
                        className="font-semibold text-lg cursor-pointer gradient-wipe transition-[background-position,transform] duration-500 ease-in-out"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmail;
