import { useState, type ChangeEvent, type FormEvent } from "react";
import ErrorMessage from "../../utils/ErrorMessage";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

function ProfileDelete() {
    const [formData, setFormData] = useState({
        authPassword: "",
    });
    const [error, setError] = useState<string>("");
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ authPassword: e.target.value });
        setError("");
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "DELETE",
                    credentials: "include",
                    body: JSON.stringify(formData),
                    headers: { "Content-type": "application/json" },
                }
            );
            if (!response.ok) {
                const body = await response.json();
                setError(body.msg);
            } else {
                logout();
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError("Internal server issues. Please try again later.");
            }
        }
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label
                        htmlFor="authPassword"
                        className="font-bold text-sm text-gray-500 mb-2"
                    >
                        Confirm with your password
                    </label>
                    <input
                        type="password"
                        id="authPassword"
                        name="authPassword"
                        required
                        onChange={handleInputChange}
                        value={formData.authPassword}
                        className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                    />
                </div>
                <button
                    type="submit"
                    className="cursor-pointer w-full mt-5 max-w-md mx-auto flex items-center justify-center gap-2 bg-red-100 border border-red-200 px-4 py-2 rounded-md hover:bg-red-200 text-red-700 hover:text-red-800 transition"
                >
                    Delete
                </button>
            </form>
        );
    }

    return (
        <div className="flex flex-col gap-5 shadow p-7 rounded-md">
            <p className="font-bold text-xl">Are you sure?</p>
            {error && <ErrorMessage errorMsg={error} />}
            {renderForm()}
        </div>
    );
}

export default ProfileDelete;
