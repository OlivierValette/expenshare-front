import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="navbar-brand">
                    <NavLink exact to="/" className="nav-link">
                        <img src="./../ES-small.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
                        Expenshare
                    </NavLink>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/expense" className="nav-link">Dépenses</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/person" className="nav-link">Personnes</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;