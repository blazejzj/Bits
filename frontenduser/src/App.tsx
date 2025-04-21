import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./components/Header";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4">
                <Header />
                <main className="bg-white flex-1 p-6 rounded-lg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;
