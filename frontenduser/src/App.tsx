import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./components/Header";

function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
