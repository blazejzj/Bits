import { useState, type ChangeEvent } from "react";

function ProfilePassword() {
    const [passwordFormData, setPasswordFormData] = useState({
        newPassword: "",
        confirmPassword: "",
        authPassword: "",
    });

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
    }

    function displayPasswordForm() {
        return (
            <form className="flex flex-col gap-5 shadow p-7 rounded-md">
                <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword" className="font-bold text-l">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        required
                        onChange={changeFormElement}
                        value={passwordFormData.newPassword}
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
