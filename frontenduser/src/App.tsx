// src/App.tsx
import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="container mx-auto px-4 flex-1 flex flex-col">
                <Header />

                <main className="bg-white flex-1 p-6 rounded-lg shadow-sm">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default App;
