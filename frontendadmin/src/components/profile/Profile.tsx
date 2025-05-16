import { Outlet } from "react-router";
import ProfileNavigation from "./ProfileNavigation";

export default function Profile() {
    return (
        <div className="flex items-center justify-center w-full h-full self-center">
            <div className="flex flex-row w-[600px] items-center">
                <ProfileNavigation />
                <div className="flex-1 overflow-auto ml-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
