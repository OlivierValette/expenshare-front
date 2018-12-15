import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-brand">
                    <NavLink exact to="/" className="nav-link">Booklib</NavLink>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;