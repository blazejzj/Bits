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
                <p className="font-bold text-2xl">Change password</p>
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
                <label htmlFor="newPassword">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    required
                    onChange={changeFormElement}
                    value={passwordFormData.newPassword}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    onChange={changeFormElement}
                    value={passwordFormData.confirmPassword}
                />
                <label htmlFor="authPassword">Old Password</label>
                <input
                    type="password"
                    name="authPassword"
                    id="authPassword"
                    required
                    onChange={changeFormElement}
                    value={passwordFormData.authPassword}
                />
                <button type="submit" className="cursor-pointer">
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
