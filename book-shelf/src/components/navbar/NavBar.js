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

                <NavLink to="/Search" className="nav-link">
                    Search
                </NavLink>
                <span>Search</span>

            </nav>
        </div>
    );
};

export default NavBar;