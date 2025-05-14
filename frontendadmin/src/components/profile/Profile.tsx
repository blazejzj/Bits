import { Outlet } from "react-router";
import ProfileNavigation from "./ProfileNavigation";

export default function Profile() {
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

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-row">
                <ProfileNavigation />
                <Outlet />
            </div>
        </div>
    );
}
