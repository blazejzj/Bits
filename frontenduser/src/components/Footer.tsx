import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
    function renderFooter() {
        return (
            <div className="bg-white flex flex-row justify-between mt-3 p-5 items-center">
                <div>
                    <NavLink to="/">
                        <p className="font-bold text-5xl text-cyan-700 ml-5 mr-3 flex items-baseline flex-nowrap text-nowrap">
                            Bits <b className="text-xs">by opex</b>
                        </p>
                    </NavLink>
                </div>
                <p>Copyright 2025</p>
                <div className="flex flex-row items-center justify-center gap-2">
                    <p>Made by opex</p>
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
