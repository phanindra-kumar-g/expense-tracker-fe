import React, { useState } from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';

const Header = (args) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light app-header">
            <Link className="navbar-brand" to="/expenses">Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/reminders" >Reminders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/expenses" >Expenses</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;