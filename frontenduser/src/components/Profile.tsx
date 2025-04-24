import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateEmail from "./profileUpdates/UpdateEmail";
import UpdateName from "./profileUpdates/UpdateName";
import UpdatePassword from "./profileUpdates/UpdatePassword";

function Profile() {
    const { user, loading } = useAuth();
    const [updateEmail, setUpdateEmail] = useState<boolean>(false);
    const [updateName, setUpdateName] = useState<boolean>(false);
    const [updatePassword, setUpdatePassword] = useState<boolean>(false);

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
                            <div className="flex gap-2">{user.username}</div>
                        </div>
                        <div>
                            <p className="font-bold">Email</p>
                            <div
                                className={`flex gap-2 ${
                                    updateEmail ? " flex-col" : ""
                                }`}
                            >
                                <span>{user.email}</span>
                                {updateEmail ? (
                                    <UpdateEmail
                                        setUpdateEmail={setUpdateEmail}
                                    />
                                ) : (
                                    <button
                                        onClick={handleEmailClick}
                                        className="cursor-pointer"
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
                                <span>{user.name}</span>
                                {updateName ? (
                                    <UpdateName setUpdateName={setUpdateName} />
                                ) : (
                                    <button
                                        onClick={handleNameClick}
                                        className="cursor-pointer"
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
