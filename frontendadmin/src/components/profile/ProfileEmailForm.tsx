import { useState, type ChangeEvent, type FormEvent } from "react";
import ErrorMessage from "../../utils/ErrorMessage";
import ConfirmationMessage from "../../utils/ConfirmationMessage";
import useAuth from "../../hooks/useAuth";

interface ProfileEmailFormProps {
    toggleEmailChange: () => void;
}

function ProfileEmailForm({ toggleEmailChange }: ProfileEmailFormProps) {
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        authPassword: "",
    });

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setMessage("");
        setError("");
    }

    function resetFormData() {
        setFormData({
            email: "",
            authPassword: "",
        });
    }

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                const body = await response.json();
                if (Array.isArray(body.msg)) {
                    setError(body.msg[0].msg);
                } else {
                    setError(body.msg);
                }
            } else {
                const body = await response.json();
                setMessage(body.msg);
                setUser((prev) => ({ ...prev!, email: formData.email }));
            }
        } catch (err) {
            if (err instanceof Error) {
                setError("Internal server issues. Couldn't update value.");
            }
        }
        resetFormData();
    }

    return (
        <form onSubmit={handleSubmitForm} className="ml-3 flex flex-col gap-3">
            {error && <ErrorMessage errorMsg={error} />}
            {message && <ConfirmationMessage confirmMsg={message} />}

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-l">
                    New Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={handleInputChange}
                    value={formData.email}
                    className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="authPassword" className="font-bold text-l">
                    Password
                </label>
                <input
                    type="password"
                    name="authPassword"
                    id="authPassword"
                    onChange={handleInputChange}
                    value={formData.authPassword}
                    className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                />
            </div>
            <div className="flex gap-4 mt-2">
                <button type="submit" className="cursor-pointer font-bold">
                    Update
                </button>
                <button
                    onClick={toggleEmailChange}
                    className="cursor-pointer font-bold"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
export default ProfileEmailForm;
