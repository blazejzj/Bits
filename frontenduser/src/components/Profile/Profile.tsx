import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import UpdateEmail from "./UpdateEmail";
import UpdateName from "./UpdateName";
import UpdatePassword from "./UpdatePassword";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, logout, loading } = useAuth();
    const [updateEmail, setUpdateEmail] = useState<boolean>(false);
    const [updateName, setUpdateName] = useState<boolean>(false);
    const [updatePassword, setUpdatePassword] = useState<boolean>(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
    const [deleteAuthPassword, setDeleteAuthPassword] = useState<string>("");
    const [deleteErrors, setDeleteErrors] = useState<string>();
    const navigate = useNavigate();

    if (loading) {
        return <p>loading...</p>;
    }

    if (!user) {
        return <p>No user logged in. Unauthorized.</p>;
    }

    function handleEmailClick() {
        setUpdateEmail(!updateEmail);
    }

    function handleNameClick() {
        setUpdateName(!updateName);
    }

    function handlePasswordClick() {
        setUpdatePassword(!updatePassword);
    }

    async function handleDeleteAccount() {
        const password = {
            authPassword: deleteAuthPassword,
        };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/profile`,
                {
                    method: "DELETE",
                    credentials: "include",
                    body: JSON.stringify(password),
                    headers: { "Content-type": "application/json" },
                }
            );
            if (!response.ok) {
                const body = await response.json();
                setDeleteErrors(body.msg);
            } else {
                logout();
                navigate("/", { replace: true });
                window.location.reload();
            }
        } catch (err) {
            if (err instanceof Error) {
                setDeleteErrors(
                    "Internal server error. Please try again later."
                );
            }
        }
    }

    function toggleDeleteAccount() {
        setDeleteAuthPassword("");
        setIsDeletingAccount(!isDeletingAccount);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="shadow p-7 flex flex-col gap-3 rounded-md">
                <div className="font-bold text-2xl">
                    <h1>
                        Welcome <b className="text-cyan-700">{user.name}</b>,
                        how are you today?
                    </h1>
                </div>
                <div>
                    <h2 className="text-center">Your information</h2>
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="font-bold">Username</p>
                            <div className="flex gap-2">
                                <span data-testid="profile-usernamefield">
                                    {user.username}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Email</p>
                            <div
                                className={`flex gap-2 ${
                                    updateEmail ? " flex-col" : ""
                                }`}
                            >
                                <span data-testid="profile-emailfield">
                                    {user.email}
                                </span>
                                {updateEmail ? (
                                    <UpdateEmail
                                        setUpdateEmail={setUpdateEmail}
                                    />
                                ) : (
                                    <button
                                        onClick={handleEmailClick}
                                        className="cursor-pointer"
                                        data-testid="profile-editemailbtn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="text-cyan-700 cursor-pointer"
                                            size="lg"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Name</p>
                            <div
                                className={`flex gap-2 ${
                                    updateName ? "flex-col" : ""
                                }`}
                            >
                                <span data-testid="profile-namefield">
                                    {user.name}
                                </span>
                                {updateName ? (
                                    <UpdateName setUpdateName={setUpdateName} />
                                ) : (
                                    <button
                                        onClick={handleNameClick}
                                        className="cursor-pointer"
                                        data-testid="profile-editnamebtn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="text-cyan-700"
                                            size="lg"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Password</p>
                            <div
                                className={`flex gap-2 ${
                                    updatePassword ? "flex-col" : ""
                                }`}
                            >
                                <span>*********</span>
                                {updatePassword ? (
                                    <UpdatePassword
                                        setUpdatePassword={setUpdatePassword}
                                    />
                                ) : (
                                    <button
                                        className="cursor-pointer"
                                        onClick={handlePasswordClick}
                                        data-testid="profile-editpasswordbtn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="text-cyan-700"
                                            size="lg"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="mt-5 w-full max-w-md">
                            {deleteErrors ? (
                                <p className="bg-red-100 text-red-700 border border-red-200 rounded-md px-4 py-2 mb-2">
                                    {deleteErrors}
                                </p>
                            ) : (
                                ""
                            )}
                            {isDeletingAccount ? (
                                <div className="bg-red-50 border border-red-300 rounded-lg p-6 flex flex-col gap-4">
                                    <p className="text-red-800 font-semibold text-xl">
                                        Are you sure?
                                    </p>
                                    <label
                                        htmlFor="authPassword"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Confirm with your password
                                    </label>
                                    <input
                                        id="authPassword"
                                        name="authPassword"
                                        type="password"
                                        required
                                        onChange={(e) => (
                                            setDeleteAuthPassword(
                                                e.target.value
                                            ),
                                            setDeleteErrors("")
                                        )}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                    />
                                    <div className="mt-4 flex justify-end gap-3">
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={toggleDeleteAccount}
                                            className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={toggleDeleteAccount}
                                    className="cursor-pointer w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-red-100 border border-red-200 px-4 py-2 rounded-md hover:bg-red-200 text-red-700 hover:text-red-800 transition"
                                >
                                    <FontAwesomeIcon
                                        icon={faUserSlash}
                                        size="lg"
                                    />
                                    <span className="font-semibold">
                                        Delete account
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
