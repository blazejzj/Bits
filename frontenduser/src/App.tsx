import "../index.css";
import Header from "./components/Header";

function App() {
    // chekc if user is logged in?
    // if no user, null (We need context that says user is null)
    // if user we need context that holds user information
    // JWT tokens are finished and they are stores in cookies.

    return (
        <div className="container">
            <Header />
        </div>
    );
}

export default App;
