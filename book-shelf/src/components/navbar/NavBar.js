import React from 'react';
import { NavLink } from 'react-router-dom';
import { removeSessionCookie } from "../../utilities/CookieUtils.js";

function NavBar({ history }) {

    const handleLink = e => {
        e.preventDefault();
        window.history.pushState({}, document.title, e.target.href);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info mb-4">
                <NavLink to="/Bookshelf" className="navbar-brand">
                    My Bookshelf
                </NavLink>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/Search" className="nav-link">
                            Search
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link" onClick={removeSessionCookie}>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;