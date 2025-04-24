import { Outlet } from "react-router-dom";
import "../index.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            <div className="container mx-auto px-4 flex-1 flex flex-col">
                <Header />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <main className="bg-white flex-1 p-6 shadow-sm flex h-max w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
