import Header from "./components/Header";
import Footer from "./components/Footer";
import LogInPage from "./components/LogInPage";
import { Outlet } from "react-router";
import useAuth from "./hooks/useAuth";

function App() {
    const { user } = useAuth();

    return (
        <div>
            {user && user.role == "ADMIN" ? (
                <div>
                    <p>{user.name} hehe</p>
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            ) : (
                <LogInPage />
            )}
        </div>
    );
}

export default App;
