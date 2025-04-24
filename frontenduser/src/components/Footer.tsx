import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";

function Footer() {
    function renderFooter() {
        return (
            <div className="bg-white flex flex-col md:flex-row gap-3 md:gap-0 justify-between mt-3 p-5 items-center ">
                <div>
                    <Logo />
                </div>
                <p>Copyright 2025</p>
                <div className="flex flex-row items-center justify-center gap-2">
                    <p>Made by blazejzj</p>
                    <a
                        href="https://github.com/blazejzj"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {" "}
                        <FontAwesomeIcon icon={faGithub} size="2xl" />
                    </a>
                </div>
            </div>
        );
    }
    return renderFooter();
}

export default Footer;
