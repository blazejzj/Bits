import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./components/Header";

function App() {
    return (
        <div className="app w-full">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
