import { Header } from "./components/Header";
import LoginRegister from "./components/LoginRegister";

function App() {
    // context to see if theres an user logged currently in or not

    return (
        <div>
            <Header />
            <LoginRegister />
            <h1>App.js</h1>
        </div>
    );
}

export default App;
