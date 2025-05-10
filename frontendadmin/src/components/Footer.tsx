import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router";

function Footer() {
    const renderFooterLink = () => {
        return (
            <div className="flex flex-row items-center justify-center gap-2">
                <p>Made by blazejzj</p>
                <Link
                    to="https://github.com/blazejzj"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGithub} size="2xl" />
                </Link>
            </div>
        );
    };

    return (
        <div className="flex justify-between items-center p-6 bg-white shadow-sm">
            <Logo />
            {renderFooterLink()}
        </div>
    );
}

export default Footer;
