import Logo from "./Logo";

function Header() {
    function renderMenu() {
        return (
            <nav>
                <ul>
                    <li>wow1</li>
                    <li>wow2</li>
                    <li>wow3</li>
                </ul>
            </nav>
        );
    }
    return (
        <div>
            <Logo />
            {renderMenu()}
        </div>
    );
}

export default Header;
