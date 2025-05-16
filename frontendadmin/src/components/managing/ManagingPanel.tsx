import { Outlet } from "react-router";
import ManagingNavigation from "./ManagingNavigation";

function ManagingPanel() {
    return (
        <div className="flex flex-col w-full h-full">
            <ManagingNavigation />
            <Outlet />
        </div>
    );
}

export default ManagingPanel;
