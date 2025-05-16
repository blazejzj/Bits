import Header from "./components/Header";
import Footer from "./components/Footer";
import LogInPage from "./components/login/LogInPage";
import { Outlet } from "react-router";
import useAuth from "./hooks/useAuth";

function App() {
    const { user } = useAuth();

    return (
        <div className="bg-gray-200 flex flex-col h-full">
            <div className="container mx-auto px-4 flex-1 flex flex-col h-full">
                {user && user.role == "ADMIN" ? (
                    <div className="flex flex-col h-full">
                        <Header />
                        <main className="bg-white flex-1 p-6 shadow-sm flex container mx-auto">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                ) : (
                    <LogInPage />
                )}
            </div>
        </div>
    );
}

export default App;
