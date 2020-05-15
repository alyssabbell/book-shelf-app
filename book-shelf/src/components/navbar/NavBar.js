import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    const handleLink = e => {
        e.preventDefault();
        window.history.pushState({}, document.title, e.target.href);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
                <NavLink to="/Bookshelf" className="navbar-brand">
                    My Bookshelf
                </NavLink>

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <NavLink to="/Search" className="nav-link">
                            Search
                </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;