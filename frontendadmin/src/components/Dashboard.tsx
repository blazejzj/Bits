import useAuth from "../hooks/useAuth";
import developer from "../assets/developer.svg";

function Dashboard() {
    const { user } = useAuth();
    function renderGreeting() {
        return (
            <h1 className="text-5xl">
                Welcome{" "}
                <span className="font-bold text-gray-600">{user!.name}</span>{" "}
                how are you today?
            </h1>
        );
    }

    return (
        <div className="flex flex-col gap-7 items-center justify-center w-full from-left">
            {renderGreeting()}
            <img src={developer} alt="Dev" />
        </div>
    );
}

export default Dashboard;
