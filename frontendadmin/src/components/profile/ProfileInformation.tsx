import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProfileInformation() {
    const { user } = useAuth();

    function displayGreeting() {
        return (
            <div>
                <p className="font-bold text-2xl">
                    Hello <span className="text-gray-600">{user!.name}</span>!
                    How are you today?
                </p>
            </div>
        );
    }

    function displayProfileInformation() {
        return (
            <div className="flex flex-col gap-5 shadow p-7 rounded-md">
                <div>
                    <p className="font-bold text-l">Username:</p>
                    <div className="flex flex-row gap-2">
                        <span>{user!.username}</span>
                        <button className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-gray-700"
                                size="lg"
                            />
                        </button>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-l">Name:</p>
                    <div className="flex flex-row gap-2">
                        <span>{user!.name}</span>
                        <button className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-gray-700"
                                size="lg"
                            />
                        </button>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-l">Email:</p>
                    <div className="flex flex-row gap-2">
                        <span>{user!.email}</span>
                        <button className="cursor-pointer">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-gray-700"
                                size="lg"
                            />
                        </button>
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
