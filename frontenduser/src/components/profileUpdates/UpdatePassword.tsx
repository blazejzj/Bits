import { ChangeEvent, FormEvent, useState } from "react";

type UpdatePasswordProps = {
    setUpdatePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

type ErrorType = {
    msg: string;
};

function UpdatePassword({ setUpdatePassword }: UpdatePasswordProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const [messages, setMessages] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        authPassword: "",
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessages([]);
        setErrors([]);

        try {
            const response = await fetch("http://localhost:3000/profile", {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
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
                setFormData({
                    password: "",
                    confirmPassword: "",
                    authPassword: "",
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrors([
                    ...errors,
                    "Internal server issues. Couldn't update value.",
                ]);
            }
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setErrors([]);
        setMessages([]);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleCancelUpdate() {
        setUpdatePassword(false);
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
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium">
                            New password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Enter new password..."
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="confirmPassword"
                            className="font-medium"
                        >
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            placeholder="Confirm new password..."
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="authPassword" className="font-medium">
                            Old password
                        </label>
                        <input
                            type="password"
                            id="authPassword"
                            name="authPassword"
                            required
                            value={formData.authPassword}
                            onChange={handleChange}
                            placeholder="Old password..."
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                        />
                    </div>
                    <div className="flex gap-3 mt-3">
                        <button
                            type="submit"
                            className="font-semibold text-lg cursor-pointer gradient-wipe transition-[background-position, transform] duration-500 ease-in-out"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleCancelUpdate}
                            className="font-semibold text-lg cursor-pointer gradient-wipe transition-[background-position, transform] duration-500 ease-in-out"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UpdatePassword;
