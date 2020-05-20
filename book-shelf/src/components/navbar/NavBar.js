import React from 'react';
import { NavLink } from 'react-router-dom';
import { removeSessionCookie } from "../../utilities/CookieUtils.js";
import "./navbar.css";

function NavBar({ history }) {

    const handleLink = e => {
        e.preventDefault();
        window.history.pushState({}, document.title, e.target.href);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <NavLink to="/Bookshelf" className="navbar-brand" id="title">
                    Bookshelf
                </NavLink>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/Search" className="nav-link">
                            <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd" />
                            </svg>
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