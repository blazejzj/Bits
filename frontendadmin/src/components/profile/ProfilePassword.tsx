import { useState, type ChangeEvent, type FormEvent } from "react";
import ErrorMessage from "../../utils/ErrorMessage";
import ConfirmationMessage from "../../utils/ConfirmationMessage";

function ProfilePassword() {
    const [passwordFormData, setPasswordFormData] = useState({
        password: "",
        confirmPassword: "",
        authPassword: "",
    });
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    function resetPasswordFormData() {
        setPasswordFormData({
            password: "",
            confirmPassword: "",
            authPassword: "",
        });
    }

    function resetErrorAndMessage() {
        setMessage("");
        setError("");
    }

    async function handlePasswordChangeSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "PATCH",
                    credentials: "include",
                    body: JSON.stringify(passwordFormData),
                    headers: { "Content-type": "application/json" },
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
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
        resetPasswordFormData();
    }

    function displayTitle() {
        return (
            <div>
                <p className="font-bold text-2xl text-center">
                    Change password
                </p>
            </div>
        );
    }

    function changeFormElement(e: ChangeEvent<HTMLInputElement>) {
        setPasswordFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        resetErrorAndMessage();
    }

    function displayPasswordForm() {
        return (
            <form
                className="flex flex-col gap-5 shadow p-7 rounded-md"
                onSubmit={handlePasswordChangeSubmit}
            >
                {error && <ErrorMessage errorMsg={error} />}
                {message && <ConfirmationMessage confirmMsg={message} />}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-bold text-l">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={changeFormElement}
                        value={passwordFormData.password}
                        className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="font-bold text-l"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        onChange={changeFormElement}
                        value={passwordFormData.confirmPassword}
                        className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="authPassword" className="font-bold text-l">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="authPassword"
                        id="authPassword"
                        required
                        onChange={changeFormElement}
                        value={passwordFormData.authPassword}
                        className="border-gray-200 border px-3 py-2 rounded-md focus:border-gray-600 focus:outline-none focus:ring-2"
                    />
                </div>
                <button
                    type="submit"
                    className="cursor-pointer bg-gray-700 text-white p-2 rounded-md font-bold hover:bg-gray-600 mt-3"
                >
                    Change Password
                </button>
            </form>
        );
    }

    return (
        <div className="p-5 flex flex-col gap-3">
            {displayTitle()}
            {displayPasswordForm()}
        </div>
    );
}

export default ProfilePassword;
