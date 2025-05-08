import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import { Outlet } from "react-router";

function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false); // temporary

    return (
        <div>
            {loggedIn ? (
                <div>
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            ) : (
                <LogIn />
            )}
        </div>
    );
}

export default App;
