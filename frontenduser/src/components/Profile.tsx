import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const { user, loading } = useAuth();
    const [errors, setErrors] = useState<string[]>();
    const [updateEmail, setUpdateEmail] = useState<boolean>(false);
    const [updateName, setUpdateName] = useState<boolean>(false);
    const [updatePassword, setUpdatePassword] = useState<boolean>(false);

    if (loading) {
        return <p>loading...</p>;
    }

    if (!user) {
        return <p>No user logged in. Unauthorized.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="shadow p-7 flex flex-col gap-3">
                <div className="font-bold text-2xl">
                    <h1>
                        Welcome <b className="text-cyan-700">{user.name}</b>,
                        how are you today?
                    </h1>
                </div>
                <div>
                    <h2 className="text-center">Your information</h2>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="font-bold">Username</p>
                            <div className="flex gap-2 items-center">
                                {user.username}
                                <button>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-cyan-700"
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Email</p>
                            <div className="flex gap-2 items-center">
                                {user.email}
                                <button>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-cyan-700"
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">Name</p>
                            <div className="flex gap-2 items-center">
                                {user.name}
                                <button>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        className="text-cyan-700"
                                    />
                                </button>
                            </div>
                        </div>
                        <p>Change password</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
