import React, { useState } from "react";

export function Header() {
    const [user, setUser] = useState(null);

    function renderNotSignedIn() {
        return (
            <div>
                <h1>Bits</h1>
                <nav>
                    <ul>
                        <li>Posts</li>
                        <li>Log in</li>
                    </ul>
                </nav>
            </div>
        );
    }

    function renderSignedIn() {
        return (
            <div>
                <h1>Bits</h1>
                <nav>
                    <ul>
                        <li>Posts</li>
                        <li>Account</li>
                        <li>Log out</li>
                    </ul>
                </nav>
            </div>
        );
    }

    if (user) {
        return renderSignedIn();
    } else {
        return renderNotSignedIn();
    }
}
