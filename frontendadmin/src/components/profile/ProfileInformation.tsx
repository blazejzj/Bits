import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProfileNameForm from "./ProfileNameForm";
import ProfileEmailForm from "./ProfileEmailForm";

function ProfileInformation() {
    const { user } = useAuth();
    const [updatingName, setUpdatingName] = useState<boolean>(false);
    const [updatingEmail, setUpdatingEmail] = useState<boolean>();

    function toggleNameChange() {
        setUpdatingName(!updatingName);
    }

    function toggleEmailChange() {
        setUpdatingEmail(!updatingEmail);
    }

    function displayGreeting() {
        return (
            <div className="text-center">
                <p className="font-bold text-2xl">
                    Hello <span className="text-gray-600">{user!.name}</span>!
                    How are you today?
                </p>
            </div>
        );
    }

    function displayProfileInformation() {
        return (
            <div className="flex flex-col gap-8 shadow p-7 rounded-md">
                <div>
                    <p className="font-bold text-l">Username:</p>
                    <div className="flex flex-row gap-2">
                        <span>{user!.username}</span>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-l">Name:</p>
                    <div
                        className={`flex gap-2 ${
                            updatingName ? "flex-col" : "flex-row"
                        }`}
                    >
                        <span>{user!.name}</span>
                        {updatingName ? (
                            <ProfileNameForm
                                toggleNameChange={toggleNameChange}
                            />
                        ) : (
                            <button
                                className="cursor-pointer"
                                onClick={toggleNameChange}
                            >
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-gray-700"
                                    size="lg"
                                />
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <p className="font-bold text-l">Email:</p>
                    <div
                        className={`flex gap-2 ${
                            updatingEmail ? "flex-col" : "flex-row"
                        }`}
                    >
                        <span>{user!.email}</span>
                        {updatingEmail ? (
                            <ProfileEmailForm
                                toggleEmailChange={toggleEmailChange}
                            />
                        ) : (
                            <button
                                className="cursor-pointer"
                                onClick={toggleEmailChange}
                            >
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-gray-700"
                                    size="lg"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 flex flex-col gap-3">
            {displayGreeting()}
            {displayProfileInformation()}
        </div>
    );
}

export default ProfileInformation;
