import { useState, type ChangeEvent, type FormEvent } from "react";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../utils/ErrorMessage";
import ConfirmationMessage from "../../utils/ConfirmationMessage";

interface ProfileNameFormProps {
    toggleNameChange: () => void;
}

function ProfileNameForm({ toggleNameChange }: ProfileNameFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        authPassword: "",
    });
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const { setUser } = useAuth();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
        setMessage("");
    }

    function resetFormData() {
        setFormData({
            name: "",
            authPassword: "",
        });
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
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
                setUser((prev) => ({ ...prev!, name: formData.name }));
            }
        } catch (err) {
            if (err instanceof Error) {
                setError("Internal server issues. Couldn't update value.");
            }
        }
        resetFormData();
    }

    function renderForm() {
        return (
            <form
                onSubmit={handleFormSubmit}
                className="ml-3 flex flex-col gap-3"
            >
                {error && <ErrorMessage errorMsg={error} />}
                {message && <ConfirmationMessage confirmMsg={message} />}

                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-bold text-l">
                        New Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
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
                        required
                        value={formData.authPassword}
                        onChange={handleInputChange}
                        className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="flex gap-4 mt-2">
                    <button type="submit" className="cursor-pointer font-bold">
                        Update
                    </button>
                    <button
                        onClick={toggleNameChange}
                        className="cursor-pointer font-bold"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    return <div>{renderForm()}</div>;
}

export default ProfileNameForm;
